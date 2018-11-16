import { TextField, withStyles } from '@material-ui/core';
import React from 'react';
import ButtonLink from '../components/ButtonLink';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import SaveButton from '../components/SaveButton';
import SongLyrics from '../components/SongLyrics';
import { firestore } from '../firebase';
import { parseLyrics } from '../opensong';

function LyricsPreview({ lyrics }) {
  const parsedLyrics = parseLyrics(lyrics);
  return <SongLyrics lyrics={parsedLyrics} />;
}

class EditSong extends React.Component {
  state = {
    ...this.props.song,
    saving: false,
    saved: false,
    error: null,
  };

  render() {
    const { classes } = this.props;
    const { id, title, author, lyrics, key, saving, saved, error } = this.state;

    const updateField = field => e => this.setState({ [field]: e.target.value });

    return (
      <form onSubmit={this.save} className={classes.form}>
        <TextField
          id="title"
          label="Title"
          value={title}
          required
          onChange={updateField('title')}
          disabled={saving}
          className={classes.field}
        />
        <TextField
          id="author"
          label="Author"
          value={author}
          required
          onChange={updateField('author')}
          disabled={saving}
          className={classes.field}
        />
        <TextField id="key" label="Key" value={key} onChange={updateField('key')} disabled={saving} className={classes.field} />

        <TextField
          id="lyrics"
          label="Lyrics"
          value={lyrics}
          multiline
          rowsMax={100}
          required
          onChange={updateField('lyrics')}
          className={classes.lyrics}
        />

        <div className={classes.preview}>
          <h2>Preview</h2>
          <LyricsPreview lyrics={lyrics} />
        </div>

        {error && <ErrorSnackbar message="Error saving song" error={error} />}

        <div className={classes.actions}>
          <SaveButton saving={saving} saved={saved} valid={title && author && lyrics} />
          <ButtonLink to={`/songs/${id}`}>Cancel</ButtonLink>
        </div>
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

const styles = ({ spacing }) => ({
  form: {
    padding: spacing.unit * 3,
    display: 'flex',
    flexWrap: 'wrap',
  },
  field: {
    margin: spacing.unit,
  },
  lyrics: {
    width: '100%',
    margin: spacing.unit,
  },
  preview: {
    width: '100%',
  },
  actions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
});

const StyledEditSong = withStyles(styles)(EditSong);

export default class EditSongWrapper extends React.Component {
  state = {
    loading: true,
    error: null,
    song: null,
  };

  render() {
    const {
      match: {
        params: { songId },
      },
    } = this.props;
    const { loading, error, song } = this.state;
    const back = `/songs/${songId}`;

    if (loading) {
      return (
        <Layout back={back}>
          <Loading />
        </Layout>
      );
    }

    if (error) {
      return (
        <Layout back={back}>
          <ErrorSnackbar error={error} />
        </Layout>
      );
    }

    return (
      <Layout title={song.title} back={back}>
        <StyledEditSong song={song} saveSong={this.saveSong} />
      </Layout>
    );
  }

  async componentDidMount() {
    const {
      match: {
        params: { songId },
      },
    } = this.props;

    try {
      const doc = await firestore
        .collection('songs')
        .doc(songId)
        .get();

      this.setState({ loading: false, error: null, song: { ...doc.data(), id: doc.id } });
    } catch (error) {
      this.setState({ loading: false, error, song: null });
    }
  }

  saveSong = async song => {
    const {
      match: {
        params: { songId },
      },
    } = this.props;

    await firestore
      .collection('songs')
      .doc(songId)
      .update(song);
  };
}
