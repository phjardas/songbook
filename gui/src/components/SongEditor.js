import { Grid, TextField, withStyles } from '@material-ui/core';
import React from 'react';
import ButtonLink from '../components/ButtonLink';
import ErrorSnackbar from '../components/ErrorSnackbar';
import SaveButton from '../components/SaveButton';
import SongLyrics from '../components/SongLyrics';
import { parseLyrics } from '../opensong';

function LyricsPreview({ lyrics, ...props }) {
  const parsedLyrics = parseLyrics(lyrics);
  return <SongLyrics lyrics={parsedLyrics} {...props} />;
}

class SongEditor extends React.Component {
  state = {
    ...this.props.song,
    saving: false,
    saved: false,
    error: null,
  };

  render() {
    const {
      song: { id, draft },
      className,
      classes,
    } = this.props;
    const { title, author, lyrics, key, saving, saved, error } = this.state;

    const updateField = field => e => this.setState({ [field]: e.target.value });

    return (
      <form onSubmit={this.save} className={className}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <TextField id="title" label="Title" value={title} required onChange={updateField('title')} disabled={saving} fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField id="author" label="Author" value={author} required onChange={updateField('author')} disabled={saving} fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField id="key" label="Key" value={key} onChange={updateField('key')} disabled={saving} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              id="lyrics"
              value={lyrics}
              multiline
              rowsMax={100}
              required
              onChange={updateField('lyrics')}
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
                <ButtonLink to={draft ? '/drafts' : `/songs/${id}`}>Back</ButtonLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {error && <ErrorSnackbar message="Error saving song" error={error} />}
      </form>
    );
  }

  save = async e => {
    e.preventDefault();
    this.setState({ saving: true, saved: false, error: null });

    try {
      const { id, title, author, lyrics, key } = this.state;
      const song = { id, title, author, lyrics, key };

      await this.props.saveSong(song);
      this.setState({ saving: false, saved: true, error: null });
      setTimeout(() => this.setState({ saved: false }), 3000);
    } catch (error) {
      this.setState({ saving: false, saved: false, error });
    }
  };
}

const styles = {
  lyricsInput: {
    fontFamily: 'monospace',
  },
};

export default withStyles(styles)(SongEditor);
