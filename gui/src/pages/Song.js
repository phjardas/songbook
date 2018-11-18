import { Typography, withStyles, Zoom } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import ButtonLink from '../components/ButtonLink';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PageQR from '../components/PageQR';
import ShareSong from '../components/ShareSong';
import SongLyrics from '../components/SongLyrics';
import UserChip from '../components/UserChip';
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

      {!song.isOwner && (
        <Typography variant="body2" component="div">
          Shared by <UserChip id={song.owner} />
        </Typography>
      )}

      {song.isOwner && (
        <>
          <Zoom in={true} timeout={theme.transitions.duration.enteringScreen}>
            <ButtonLink variant="fab" color="secondary" to={`/songs/${song.id}/edit`} className={classes.fab}>
              <EditIcon />
            </ButtonLink>
          </Zoom>
          <ShareSong song={song} color="primary" />
        </>
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

function SongWrapper({ user, songId }) {
  const [{ loading, error, song }, setState] = useState({ loading: true });

  useEffect(
    () =>
      firestore
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

            setState({ loading: false, error: null, song });
          },
          error: error => setState({ loading: false, error, song: null }),
        }),
    [user, songId]
  );

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

export default ({
  match: {
    params: { songId },
  },
}) => <WithAuth>{({ user }) => <SongWrapper songId={songId} user={user} />}</WithAuth>;
