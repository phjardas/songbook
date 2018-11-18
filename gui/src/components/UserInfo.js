import { useEffect, useState } from 'react';
import { firestore } from '../firebase';

export default function UserInfo({ id, children }) {
  const [state, setState] = useState({ loading: true });

  const loadUser = async () => {
    try {
      const doc = await firestore
        .collection('users')
        .doc(id)
        .get();
      const user = { ...doc.data(), id: doc.id };
      setState({ loading: false, error: null, user });
    } catch (error) {
      setState({ loading: false, error, user: null });
    }
  };

  useEffect(() => {
    loadUser();
  });

  return children(state);
}
