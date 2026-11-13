import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import GitHubIcon from '../icons/GitHub';
import GoogleIcon from '../icons/Google';

const Context = createContext({});

const providers = [
  {
    id: 'google',
    label: 'Google',
    icon: GoogleIcon,
    get provider() {
      return new GoogleAuthProvider();
    },
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: GitHubIcon,
    get provider() {
      return new GithubAuthProvider();
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

      const userDoc = doc(firestore, 'users', user.id);
      const dbUser = await getDoc(userDoc);

      if (!dbUser.exists()) {
        await setDoc(userDoc, { ...user, signedUpAt: now, lastSignInAt: now });
      } else {
        await updateDoc(userDoc, { lastSignInAt: now });
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
  return signInWithPopup(auth, provider.provider);
}

function signOut() {
  firebaseSignOut(auth);
}

export function AuthProvider({ children }) {
  const [{ pending, user }, setState] = useState({ pending: true });

  useEffect(() => onAuthStateChanged(auth, authChangeHandler(setState)), []);

  const value = { pending, providers, signIn, signOut, user };

  return <Context value={value}>{children}</Context>;
}

export const useAuth = () => useContext(Context);
