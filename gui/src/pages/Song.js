import { withStyles } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import ButtonLink from '../components/ButtonLink';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import Song from '../components/Song';
import { firestore } from '../firebase';
import { withAuth } from '../providers/Auth';
import Layout from '../components/layout';

function EditSongButton({ song }) {
  return (
    song.isOwner &&
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

function SongWrapper({ user, songId, classes }) {
  const [state, setState] = useState({ loading: true });

  useEffect(
    () => {
      return firestore
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
  withAuth
)(({ match: { params: { songId } }, ...props }) => <SongWrapper songId={songId} {...props} />);
