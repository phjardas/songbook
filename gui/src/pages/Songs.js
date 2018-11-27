import { List, ListItem, ListItemText, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import CreateSongButton from '../components/CreateSongButton';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';
import Loading from '../components/Loading';
import { withAuth } from '../providers/Auth';
import { getSongsCollection } from '../providers/data';

let Songs = ({ loading, error, songs, classes }) => {
  if (loading) return <Loading message="Loading songs…" className={classes.loading} />;
  if (error) return <ErrorSnackbar error={error} />;
  if (!songs.length) return <em>You have no songs yet.</em>;

  return (
    <List>
      {songs.map(song => (
        <ListItem key={song.id} button component={Link} to={song.meta.url}>
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

function SongsWrapper({ user, match: { path } }) {
  const { draft, collection, toSong } = getSongsCollection({ path, user });
  const [{ loading, error, songs }, setState] = useState({ loading: true });

  useEffect(
    () => {
      return collection.onSnapshot({
        next: snapshot => {
          const songs = snapshot.docs.map(toSong).sort((a, b) => (a.title || '').localeCompare(b.title || ''));
          setState({ loading: false, error: null, songs });
        },
        error: error => setState({ loading: false, error, songs: null }),
      });
    },
    [user, path]
  );

  return (
    <Layout title={draft ? 'Drafts' : 'Songs'} Fab={CreateSongButton}>
      <Songs loading={loading} error={error} songs={songs} />
    </Layout>
  );
}

export default compose(
  withAuth,
  withRouter
)(SongsWrapper);
