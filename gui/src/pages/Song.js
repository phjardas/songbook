import { Typography, withStyles, Zoom } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import ButtonLink from '../components/ButtonLink';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PageQR from '../components/PageQR';
import SongLyrics from '../components/SongLyrics';
import { firestore } from '../firebase';
import { parseLyrics } from '../opensong';
import { WithAuth } from '../providers/Auth';

function Song({ song, classes, theme }) {
  return (
    <div className={classes.main}>
      <PageQR className={classes.qr} />
      <Typography variant="h3" component="h1">
        {song.title}
      </Typography>
      <Typography variant="subtitle1">by {song.author}</Typography>

      {song.isOwner ? (
        <>
          <Zoom in={true} timeout={theme.transitions.duration.enteringScreen}>
            <ButtonLink variant="fab" color="secondary" to={`/songs/${song.id}/edit`} className={classes.fab}>
              <EditIcon />
            </ButtonLink>
          </Zoom>
          {/* <ShareSong song={song} color="primary" outline className="mx-2" /> */}
        </>
      ) : (
        <p>
          <small>{/* <UserInfo id={song.owner}>{user => <span className="text-muted">Shared by {user.label}</span>}</UserInfo> */}</small>
        </p>
      )}

      <SongLyrics lyrics={parseLyrics(song.lyrics)} originalKey={song.key} />
    </div>
  );
}

const styles = ({ spacing }) => ({
  main: {
    padding: spacing.unit * 3,
  },
  qr: {
    '@media screen': {
      display: 'none',
    },
  },
  fab: {
    position: 'fixed',
    bottom: spacing.unit * 2,
    right: spacing.unit * 2,
  },
});

const StyledSong = withStyles(styles, { withTheme: true })(Song);

class SongWrapper extends React.Component {
  state = {
    loading: true,
    error: null,
    song: null,
    subscription: null,
  };

  render() {
    const { loading, error, song } = this.state;

    if (loading) {
      return (
        <Layout back="/">
          <Loading />
        </Layout>
      );
    }

    if (error) {
      return (
        <Layout back="/">
          <ErrorSnackbar error={error} />
        </Layout>
      );
    }

    return (
      <Layout title={song.title} back="/">
        <StyledSong song={song} />
      </Layout>
    );
  }

  async componentDidMount() {
    const { user, songId } = this.props;

    const subscription = firestore
      .collection('songs')
      .doc(songId)
      .onSnapshot({
        next: doc => {
          const data = doc.data();
          const song = {
            ...data,
            id: doc.id,
            isOwner: user.id === data.owner,
          };

          this.setState({ loading: false, error: null, song });
        },
        error: error => this.setState({ loading: false, error, song: null }),
      });

    this.setState({ subscription });
  }

  componentWillUnmount() {
    const { subscription } = this.state;
    if (subscription) subscription();
  }
}

export default ({
  match: {
    params: { songId },
  },
}) => <WithAuth>{({ user }) => <SongWrapper songId={songId} user={user} />}</WithAuth>;
