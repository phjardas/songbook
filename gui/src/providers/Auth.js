import React, { useEffect, useState } from 'react';
import { auth, Firebase, firestore } from '../firebase';
import GitHubIcon from '../icons/GitHub';
import GoogleIcon from '../icons/Google';
import { withConsumer } from './with';

const Context = React.createContext();

const providers = [
  {
    id: 'google',
    label: 'Google',
    icon: GoogleIcon,
    get provider() {
      return new Firebase.auth.GoogleAuthProvider();
    },
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: GitHubIcon,
    get provider() {
      return new Firebase.auth.GithubAuthProvider();
    },
  },
];

function authChangeHandler(setState) {
  return async evt => {
    if (evt) {
      const now = new Date();

      const user = {
        id: evt.uid,
        displayName: evt.displayName,
        email: evt.email,
        photoURL: evt.photoURL,
        label: evt.displayName || evt.email,
      };

      const userDoc = firestore.collection('users').doc(user.id);
      const dbUser = await userDoc.get();

      if (!dbUser.exists) {
        await userDoc.set({ ...user, signedUpAt: now, lastSignInAt: now });
      } else {
        await userDoc.update({ lastSignInAt: now });
      }

      setState({
        pending: false,
        user,
      });
    } else {
      setState({
        pending: false,
        user: null,
      });
    }
  };
}

function signIn(providerId) {
  const provider = providers.find(p => p.id === providerId);
  if (!provider) throw new Error(`Invalid authentication provider: ${providerId}`);
  return auth.signInWithPopup(provider.provider);
}

function signOut() {
  auth.signOut();
}

export function AuthProvider({ children }) {
  const [{ pending, user }, setState] = useState({ pending: true });

  useEffect(() => auth.onAuthStateChanged(authChangeHandler(setState)), []);

  const value = { pending, providers, signIn, signOut, user };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const WithAuth = Context.Consumer;
export const withAuth = withConsumer(WithAuth);

export function Authenticated({ children }) {
  return <WithAuth>{({ user, signOut, signingOut }) => (user ? children({ user, signOut, signingOut }) : null)}</WithAuth>;
}
export const withAuthentication = withConsumer(Authenticated);
