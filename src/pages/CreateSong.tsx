import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';
import Loading from '../components/Loading';
import { firestore } from '../firebase';
import { useUser } from '../providers/Auth';

export default function CreateSong() {
  const user = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<Error>();
  // Create exactly one draft per visit, even when the effect runs again (StrictMode, a new user object).
  const created = useRef(false);

  useEffect(() => {
    if (created.current) return;
    created.current = true;
    const song = { title: '', author: '', key: '', lyrics: '', owner: user.id };
    addDoc(collection(firestore, 'users', user.id, 'drafts'), song).then(
      doc => navigate(`/drafts/${doc.id}/edit`, { replace: true }),
      setError
    );
  }, [user, navigate]);

  return <Layout title="Create Song">{error ? <ErrorSnackbar error={error} /> : <Loading sx={{ py: 4 }} />}</Layout>;
}
