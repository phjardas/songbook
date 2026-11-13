import { Box, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import ButtonLink from './ButtonLink';
import ErrorSnackbar from './ErrorSnackbar';
import LyricsEditor from './LyricsEditor';
import SaveButton from './SaveButton';

export default function SongEditor({ song, saveSong, sx }) {
  const lyricsType = song.lyricsType || 'opensong';
  const [{ saving, saved, error }, setState] = useState({});
  const [title, setTitle] = useState(song.title || '');
  const [author, setAuthor] = useState(song.author || '');
  const [key, setKey] = useState(song.key || '');
  const [lyrics, setLyrics] = useState(song.lyrics || '');

  const save = async e => {
    e.preventDefault();
    setState({ saving: true, saved: false, error: null });

    try {
      await saveSong({ title, author, lyrics, key });
      setState({ saving: false, saved: true, error: null });
      setTimeout(() => setState({ saved: false }), 3000);
    } catch (error) {
      console.error(error);
      setState({ saving: false, saved: false, error });
    }
  };

  return (
    <Box component="form" onSubmit={save} sx={sx}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField id="title" label="Title" value={title} required onChange={e => setTitle(e.target.value)} disabled={saving} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField id="author" label="Author" value={author} required onChange={e => setAuthor(e.target.value)} disabled={saving} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField id="key" label="Key" value={key} onChange={e => setKey(e.target.value)} disabled={saving} fullWidth />
        </Grid>
        <Grid size={12}>
          <LyricsEditor lyrics={lyrics} lyricsType={lyricsType} onChange={setLyrics} disabled={saving} />
        </Grid>
        <Grid size={12}>
          <Stack direction="row-reverse" spacing={1}>
            <SaveButton saving={saving} saved={saved} valid={title && author && lyrics} />
            <ButtonLink to={song.meta.url}>Back</ButtonLink>
          </Stack>
        </Grid>
      </Grid>

      {error && <ErrorSnackbar error={error} />}
    </Box>
  );
}
