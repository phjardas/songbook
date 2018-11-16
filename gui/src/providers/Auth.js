import React from 'react';
import { auth, Firebase, firestore } from '../firebase';
import GitHubIcon from '../icons/GitHub';
import GoogleIcon from '../icons/Google';

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

export class AuthProvider extends React.Component {
  state = {
    pending: true,
    user: null,
  };

  render() {
    const { children } = this.props;
    const { pending, user } = this.state;

    const value = {
      pending,
      providers,
      signIn: this.signIn,
      signOut: this.signOut,
      user,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  componentDidMount() {
    auth.onAuthStateChanged(async evt => {
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

        this.setState({
          pending: false,
          user,
        });
      } else {
        this.setState({
          pending: false,
          user: null,
        });
      }
    });
  }

  signIn = providerId => {
    const provider = providers.find(p => p.id === providerId);
    if (!provider) throw new Error(`Invalid authentication provider: ${providerId}`);
    return auth.signInWithPopup(provider.provider);
  };

  signOut = () => auth.signOut();
}

export const WithAuth = Context.Consumer;

export function Authenticated({ children }) {
  return <WithAuth>{({ user, signOut, signingOut }) => (user ? children({ user, signOut, signingOut }) : null)}</WithAuth>;
}
