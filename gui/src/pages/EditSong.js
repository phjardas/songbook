import { withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import SongEditor from '../components/SongEditor';
import { firestore } from '../firebase';
import { withPageData } from '../providers/PageData';

function EditSongWrapper({
  match: {
    params: { songId },
  },
  setPageData,
  classes,
}) {
  const back = `/songs/${songId}`;
  const [{ loading, error, song }, setState] = useState({ loading: true });

  const loadSong = async () => {
    setPageData({ back, Fab: null });

    try {
      const doc = await firestore
        .collection('songs')
        .doc(songId)
        .get();

      const song = { ...doc.data(), id: doc.id };
      setState({ loading: false, error: null, song });
      setPageData({ title: song.title, back });
    } catch (error) {
      setState({ loading: false, error, song: null });
    }
  };

  const saveSong = async song => {
    await firestore
      .collection('songs')
      .doc(songId)
      .update(song);
  };

  useEffect(
    () => {
      loadSong();
    },
    [songId]
  );

  if (loading) return <Loading className={classes.loading} />;
  if (error) return <ErrorSnackbar error={error} />;
  return <SongEditor song={song} saveSong={saveSong} className={classes.main} />;
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
  withPageData
)(EditSongWrapper);
