import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

export default function UserInfo({ id, children }) {
  const [state, setState] = useState({ loading: true });

  const loadUser = async () => {
    try {
      const snapshot = await getDoc(doc(firestore, 'users', id));
      const user = { ...snapshot.data(), id: snapshot.id };
      setState({ loading: false, error: null, user });
    } catch (error) {
      setState({ loading: false, error, user: null });
    }
  };

  useEffect(
    () => {
      loadUser();
    },
    [id]
  );

  return children(state);
}
