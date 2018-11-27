import { List, ListItem, ListItemText, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import CreateSongButton from '../components/CreateSongButton';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';
import Loading from '../components/Loading';
import { firestore } from '../firebase';
import { withAuth } from '../providers/Auth';

let Songs = ({ loading, error, songs, classes }) => {
  if (loading) return <Loading message="Loading songs…" className={classes.loading} />;
  if (error) return <ErrorSnackbar error={error} />;
  if (!songs.length) return <em>You have no songs yet.</em>;

  return (
    <List>
      {songs.map(song => (
        <ListItem key={song.id} button component={Link} to={`/songs/${song.id}`}>
          <ListItemText primary={song.title || <em>no title</em>} secondary={song.author || <em>no author</em>} />
        </ListItem>
      ))}
    </List>
  );
};

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
});

Songs = withStyles(styles)(Songs);

function SongsWrapper({ user, match }) {
  const draft = match.path.startsWith('/drafts');
  const collection = draft
    ? firestore
        .collection('users')
        .doc(user.id)
        .collection('drafts')
    : firestore.collection('songs');

  const [{ loading, error, songs }, setState] = useState({ loading: true });

  useEffect(() => {
    return collection.onSnapshot({
      next: snapshot => {
        const songs = snapshot.docs
          .map(doc => ({
            ...doc.data(),
            id: doc.id,
            draft,
          }))
          .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        setState({ loading: false, error: null, songs });
      },
      error: error => setState({ loading: false, error, songs: null }),
    });
  }, []);

  return (
    <Layout title="Songs" Fab={CreateSongButton}>
      <Songs loading={loading} error={error} songs={songs} />
    </Layout>
  );
}

export default compose(
  withAuth,
  withRouter
)(SongsWrapper);
