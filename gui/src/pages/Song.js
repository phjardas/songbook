import { withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Song from '../components/Song';
import { firestore } from '../firebase';
import { withAuth } from '../providers/Auth';

function SongWrapper({ user, songId, classes }) {
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
        <Loading className={classes.loading} />
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

  return <Song song={song} />;
}

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
});

export default compose(
  withStyles(styles),
  withAuth()
)(({ match: { params: { songId } }, ...props }) => <SongWrapper songId={songId} {...props} />);
