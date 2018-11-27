import { Grid, TextField, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ButtonLink from '../components/ButtonLink';
import ErrorSnackbar from '../components/ErrorSnackbar';
import SaveButton from '../components/SaveButton';
import SongLyrics from '../components/SongLyrics';
import { parseLyrics } from '../opensong';

function LyricsPreview({ lyrics, ...props }) {
  const parsedLyrics = parseLyrics(lyrics);
  return <SongLyrics lyrics={parsedLyrics} {...props} />;
}

function SongEditor({ song, saveSong, className, classes }) {
  const {
    id,
    meta: { draft },
  } = song;

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
        <Grid item xs={12} lg={6}>
          <TextField
            id="lyrics"
            value={lyrics}
            multiline
            rowsMax={100}
            required
            onChange={e => setLyrics(e.currentTarget.value)}
            disabled={saving}
            fullWidth
            InputProps={{ className: classes.lyricsInput }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <LyricsPreview lyrics={lyrics} />
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
