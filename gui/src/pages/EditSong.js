import { withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import SongEditor from '../components/SongEditor';
import { firestore } from '../firebase';
import Layout from '../components/layout';
import { withAuthentication } from '../providers/Auth';

function EditSong({ loading, error, song, saveSong, classes }) {
  if (loading) return <Loading className={classes.loading} />;
  if (error) return <ErrorSnackbar error={error} />;
  return <SongEditor song={song} saveSong={saveSong} className={classes.main} />;
}

function EditSongWrapper({ match, user, classes }) {
  const {
    params: { songId },
    path,
  } = match;

  const draft = path.startsWith('/');
  const collection = draft
    ? firestore
        .collection('users')
        .doc(user.id)
        .collection('drafts')
    : firestore.collection('songs');
  const docRef = collection.doc(songId);

  const [state, setState] = useState({ loading: true });

  const loadSong = async () => {
    try {
      const doc = await docRef.get();

      const song = { ...doc.data(), id: doc.id, draft };
      setState({ loading: false, error: null, song });
    } catch (error) {
      setState({ loading: false, error, song: null });
    }
  };

  const saveSong = async song => {
    await docRef.update(song);
  };

  useEffect(
    () => {
      loadSong();
    },
    [songId]
  );

  const { song } = state;
  return (
    <Layout title={song && song.title} back={draft ? '/drafts' : `/songs/${songId}`}>
      <EditSong {...state} saveSong={saveSong} classes={classes} />
    </Layout>
  );
}

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
  main: {
    padding: spacing.unit * 3,
  },
});

export default compose(
  withStyles(styles),
  withAuthentication
)(EditSongWrapper);
