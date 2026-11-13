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
  // Results are tagged with the request they belong to, so a stale result reads as loading.
  const request = `${user.id}:${draft}`;
  const [result, setResult] = useState<{ request: string; songs?: Song[]; error?: Error }>();

  useEffect(() => {
    const { collection, toSong } = getSongsCollection({ draft, user });
    return onSnapshot(collection, {
      next: snapshot => {
        const songs = snapshot.docs.map(toSong).sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        setResult({ request, songs });
      },
      error: error => setResult({ request, error }),
    });
  }, [request, user, draft]);

  if (result?.request !== request) return <LayoutLoader />;
  const { songs, error } = result;
  if (!songs) return <LayoutError error={error ?? new Error('No songs')} />;

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
