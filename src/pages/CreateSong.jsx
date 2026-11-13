import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';
import Loading from '../components/Loading';
import { firestore } from '../firebase';
import { useAuth } from '../providers/Auth';

export default function CreateSong() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  useEffect(() => {
    // ponytail: StrictMode runs this effect twice in development and creates two drafts there; production is unaffected.
    const song = { title: '', author: '', key: '', lyrics: '', owner: user.id };
    addDoc(collection(firestore, 'users', user.id, 'drafts'), song).then(
      doc => navigate(`/drafts/${doc.id}/edit`, { replace: true }),
      setError
    );
  }, [user, navigate]);

  return <Layout title="Create Song">{error ? <ErrorSnackbar error={error} /> : <Loading sx={{ py: 4 }} />}</Layout>;
}
