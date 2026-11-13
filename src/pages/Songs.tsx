import { List, ListItemButton, ListItemText } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import CreateSongButton from '../components/CreateSongButton';
import Layout from '../components/layout';
import LayoutError from '../components/LayoutError';
import LayoutLoader from '../components/LayoutLoader';
import { useUser } from '../providers/Auth';
import type { Song } from '../types';
import { getSongsCollection } from '../providers/data';

export default function Songs({ draft = false }) {
  const user = useUser();
  const [{ loading, error, songs }, setState] = useState<{ loading: boolean; error?: Error | null; songs?: Song[] | null }>({
    loading: true,
  });

  useEffect(() => {
    const { collection, toSong } = getSongsCollection({ draft, user });
    setState({ loading: true });
    return onSnapshot(collection, {
      next: snapshot => {
        const songs = snapshot.docs.map(toSong).sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        setState({ loading: false, error: null, songs });
      },
      error: error => setState({ loading: false, error, songs: null }),
    });
  }, [user, draft]);

  if (loading) return <LayoutLoader />;
  if (error || !songs) return <LayoutError error={error ?? new Error('No songs')} />;

  return (
    <Layout title={draft ? 'Drafts' : 'Songs'} Fab={CreateSongButton}>
      <List>
        {songs.map(song => (
          <ListItemButton key={song.id} component={Link} to={song.meta.url}>
            <ListItemText primary={song.title || <em>no title</em>} secondary={song.author || <em>no author</em>} />
          </ListItemButton>
        ))}
      </List>
    </Layout>
  );
}
