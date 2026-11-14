import { doc, getDoc } from 'firebase/firestore';
import { type ReactNode, useEffect, useState } from 'react';
import { firestore } from '../firebase';
import type { User } from '../types';

export default function UserInfo({ id, children }: { id: string; children: (state: { user?: User }) => ReactNode }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getDoc(doc(firestore, 'users', id)).then(
      snapshot => snapshot.exists() && setUser({ ...(snapshot.data() as User), id: snapshot.id }),
      error => console.error('Error loading user %s:', id, error)
    );
  }, [id]);

  return children({ user });
}
