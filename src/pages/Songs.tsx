import { Box, Button, List, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Layout from '../components/layout';
import LayoutError from '../components/LayoutError';
import LayoutLoader from '../components/LayoutLoader';
import Pitch from '../components/Pitch';
import { useUser } from '../providers/Auth';
import { getSongsCollection } from '../providers/data';
import type { Song } from '../types';

/** Groups songs by the first letter of their title, like the index of a printed songbook. */
function groupByLetter(songs: Song[]) {
  const groups = new Map<string, Song[]>();
  for (const song of songs) {
    const first = song.title.trim().charAt(0).toLocaleUpperCase();
    const letter = /\p{L}/u.test(first) ? first : '#';
    groups.set(letter, [...(groups.get(letter) ?? []), song]);
  }
  return [...groups];
}

function KeyBadge({ songKey }: { songKey: string }) {
  return (
    <Box
      aria-label={songKey ? `Key of ${songKey}` : undefined}
      sx={{
        width: 40,
        height: 40,
        flexShrink: 0,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'm3.tertiaryContainer',
        color: 'm3.onTertiaryContainer',
        fontWeight: 600,
        fontVariationSettings: '"wdth" 80',
        mr: 2,
      }}
    >
      {songKey ? <Pitch pitch={songKey} /> : '–'}
    </Box>
  );
}

function EmptyState({ draft }: { draft: boolean }) {
  return (
    <Box sx={{ px: 3, py: 8, textAlign: 'center', maxWidth: 420, mx: 'auto' }}>
      <Box sx={{ typography: 'h5', mb: 1 }}>{draft ? 'No drafts' : 'No songs yet'}</Box>
      <Box sx={{ typography: 'body2', color: 'text.secondary', mb: 3 }}>
        {draft
          ? 'New songs start here as drafts. Publish a draft to share it with everyone.'
          : 'Create a song, transcribe its lyrics and chords, and publish it when it is ready.'}
      </Box>
      <Button variant="contained" component={Link} to="/songs/_new">
        New song
      </Button>
    </Box>
  );
}

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
    <Layout title={draft ? 'Drafts' : 'Songs'}>
      {songs.length === 0 ? (
        <EmptyState draft={draft} />
      ) : (
        <List sx={{ px: { xs: 0, sm: 1 } }}>
          {groupByLetter(songs).map(([letter, group]) => (
            <li key={letter}>
              <Box component="ul" sx={{ p: 0 }}>
                <ListSubheader sx={{ top: 64, zIndex: 1 }}>{letter}</ListSubheader>
                {group.map(song => (
                  <ListItemButton key={song.id} component={Link} to={song.meta.url} sx={{ borderRadius: { sm: '12px' }, py: 1 }}>
                    <KeyBadge songKey={song.key} />
                    <ListItemText
                      primary={song.title || 'Untitled'}
                      secondary={song.author || 'Unknown author'}
                      slotProps={{ primary: { sx: { typography: 'body1' } }, secondary: { sx: { typography: 'body2' } } }}
                    />
                  </ListItemButton>
                ))}
              </Box>
            </li>
          ))}
        </List>
      )}
    </Layout>
  );
}
