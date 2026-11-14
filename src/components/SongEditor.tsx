import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { type FormEvent, useState } from 'react';
import { Link } from 'react-router';
import type { Song, SongData } from '../types';
import ErrorSnackbar from './ErrorSnackbar';
import LyricsEditor from './LyricsEditor';
import SaveButton from './SaveButton';

interface Props {
  song: Song;
  saveSong: (data: Partial<SongData>) => Promise<void>;
}

export default function SongEditor({ song, saveSong }: Props) {
  const lyricsType = song.lyricsType || 'opensong';
  const [{ saving, saved, error }, setState] = useState<{ saving?: boolean; saved?: boolean; error?: Error | null }>({});
  const [title, setTitle] = useState(song.title || '');
  const [author, setAuthor] = useState(song.author || '');
  const [key, setKey] = useState(song.key || '');
  const [lyrics, setLyrics] = useState(song.lyrics || '');

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setState({ saving: true, saved: false, error: null });

    try {
      await saveSong({ title, author, lyrics, key });
      setState({ saving: false, saved: true, error: null });
      setTimeout(() => setState({ saved: false }), 3000);
    } catch (error) {
      console.error(error);
      setState({ saving: false, saved: false, error: error as Error });
    }
  };

  return (
    <Box component="form" onSubmit={save} sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 5 }}>
          <TextField id="title" label="Title" value={title} required onChange={e => setTitle(e.target.value)} disabled={saving} fullWidth />
        </Grid>
        <Grid size={{ xs: 8, sm: 5 }}>
          <TextField
            id="author"
            label="Author"
            value={author}
            required
            onChange={e => setAuthor(e.target.value)}
            disabled={saving}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 4, sm: 2 }}>
          <TextField id="key" label="Key" value={key} onChange={e => setKey(e.target.value)} disabled={saving} fullWidth />
        </Grid>
        <Grid size={12}>
          <LyricsEditor lyrics={lyrics} lyricsType={lyricsType} onChange={setLyrics} disabled={saving} />
        </Grid>
        <Grid size={12}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
            <Button component={Link} to={song.meta.url}>
              Done
            </Button>
            <SaveButton saving={saving} saved={saved} valid={!!(title && author && lyrics)} />
          </Stack>
        </Grid>
      </Grid>

      {error && <ErrorSnackbar error={error} />}
    </Box>
  );
}
