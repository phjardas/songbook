import { Grid, TextField, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ButtonLink from './ButtonLink';
import ErrorSnackbar from './ErrorSnackbar';
import LyricsEditor from './LyricsEditor';
import SaveButton from './SaveButton';

function SongEditor({ song, saveSong, className }) {
  const {
    id,
    meta: { draft },
  } = song;

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
      const song = { title, author, lyrics, key };
      await saveSong(song);
      setState({ saving: false, saved: true, error: null });
      setTimeout(() => setState({ saved: false }), 3000);
    } catch (error) {
      console.error(error);
      setState({ saving: false, saved: false, error });
    }
  };

  return (
    <form onSubmit={save} className={className}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="title"
            label="Title"
            value={title}
            required
            onChange={e => setTitle(e.currentTarget.value)}
            disabled={saving}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="author"
            label="Author"
            value={author}
            required
            onChange={e => setAuthor(e.currentTarget.value)}
            disabled={saving}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField id="key" label="Key" value={key} onChange={e => setKey(e.currentTarget.value)} disabled={saving} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <LyricsEditor lyrics={lyrics} lyricsType={lyricsType} onChange={setLyrics} disabled={saving} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={8} direction="row-reverse" justify="flex-start">
            <Grid item>
              <SaveButton saving={saving} saved={saved} valid={title && author && lyrics} />
            </Grid>
            <Grid item>
              <ButtonLink to={draft ? `/drafts/${id}` : `/songs/${id}`}>Back</ButtonLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {error && <ErrorSnackbar error={error} />}
    </form>
  );
}

const styles = {
  lyricsInput: {
    fontFamily: 'monospace',
  },
};

export default withStyles(styles)(SongEditor);
