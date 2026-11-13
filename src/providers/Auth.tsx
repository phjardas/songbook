import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { type ComponentType, createContext, type ReactNode, type SVGProps, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import GitHubIcon from '../icons/GitHub';
import GoogleIcon from '../icons/Google';
import type { User } from '../types';

export interface AuthProviderInfo {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  createProvider: () => GoogleAuthProvider | GithubAuthProvider;
}

const providers: AuthProviderInfo[] = [
  { id: 'google', label: 'Google', icon: GoogleIcon, createProvider: () => new GoogleAuthProvider() },
  { id: 'github', label: 'GitHub', icon: GitHubIcon, createProvider: () => new GithubAuthProvider() },
];

interface AuthContext {
  pending: boolean;
  user: User | null;
  providers: AuthProviderInfo[];
  signIn: (providerId: string) => Promise<unknown>;
  signOut: () => Promise<void>;
}

const signIn = (providerId: string) => {
  const provider = providers.find(p => p.id === providerId);
  if (!provider) throw new Error(`Invalid authentication provider: ${providerId}`);
  return signInWithPopup(auth, provider.createProvider());
};

const signOut = () => firebaseSignOut(auth);

const Context = createContext<AuthContext>({ pending: true, user: null, providers, signIn, signOut });

async function recordSignIn(user: User) {
  const now = new Date();
  const userDoc = doc(firestore, 'users', user.id);

  if ((await getDoc(userDoc)).exists()) {
    await updateDoc(userDoc, { lastSignInAt: now });
  } else {
    await setDoc(userDoc, { ...user, signedUpAt: now, lastSignInAt: now });
  }
}

function toUser(user: FirebaseUser): User {
  return {
    id: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    label: user.displayName || user.email,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ pending, user }, setState] = useState<{ pending: boolean; user: User | null }>({ pending: true, user: null });

  useEffect(
    () =>
      onAuthStateChanged(auth, async firebaseUser => {
        const user = firebaseUser && toUser(firebaseUser);
        if (user) await recordSignIn(user);
        setState({ pending: false, user });
      }),
    []
  );

  return <Context value={{ pending, providers, signIn, signOut, user }}>{children}</Context>;
}

export const useAuth = () => useContext(Context);

/** The signed-in user; only for components rendered behind the sign-in screen. */
export function useUser(): User {
  const { user } = useAuth();
  if (!user) throw new Error('useUser requires a signed-in user');
  return user;
}
