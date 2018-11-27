import { withStyles } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import ButtonLink from '../components/ButtonLink';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';
import Loading from '../components/Loading';
import Song from '../components/Song';
import { withAuth } from '../providers/Auth';
import { getSongsCollection } from './data';

function EditSongButton({ song }) {
  return (
    song.owned &&
    (props => (
      <ButtonLink to={`/songs/${song.id}/edit`} {...props}>
        <EditIcon />
      </ButtonLink>
    ))
  );
}

function SongContent({ loading, error, song, classes }) {
  if (loading) return <Loading className={classes.loading} />;
  if (error) return <ErrorSnackbar error={error} />;
  return <Song song={song} />;
}

function SongWrapper({
  match: {
    params: { songId },
    path,
  },
  user,
  classes,
}) {
  const { collection, toSong } = getSongsCollection({ path, user });
  const [state, setState] = useState({ loading: true });

  useEffect(
    () => {
      return collection.doc(songId).onSnapshot({
        next: doc => {
          setState({ loading: false, error: null, song: toSong(doc) });
        },
        error: error => {
          setState({ loading: false, error, song: null });
        },
      });
    },
    [user, songId]
  );

  const { song } = state;
  return (
    <Layout title={song && song.title} Fab={song && EditSongButton({ song })}>
      <SongContent {...state} classes={classes} />
    </Layout>
  );
}

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
});

export default compose(
  withStyles(styles),
  withAuth,
  withRouter
)(SongWrapper);
