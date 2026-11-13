import { withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';
import Loading from '../components/Loading';
import { firestore } from '../firebase';
import { withAuth } from '../providers/Auth';

function CreateSong({ user, history, classes }) {
  const [error, setError] = useState();

  const createSong = async () => {
    try {
      const song = {
        title: '',
        author: '',
        key: '',
        lyrics: '',
        owner: user.id,
      };

      const doc = await firestore
        .collection('users')
        .doc(user.id)
        .collection('drafts')
        .add(song);
      history.push(`/drafts/${doc.id}/edit`);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(
    () => {
      createSong();
    },
    [user]
  );

  return <Layout title="Create Song">{error ? <ErrorSnackbar error={error} /> : <Loading className={classes.loading} />}</Layout>;
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
)(CreateSong);
