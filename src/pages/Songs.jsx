import { List, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import CreateSongButton from '../components/CreateSongButton';
import Layout from '../components/layout';
import LayoutError from '../components/LayoutError';
import LayoutLoader from '../components/LayoutLoader';
import { withAuth } from '../providers/Auth';
import { getSongsCollection } from '../providers/data';

function Songs({ loading, error, draft, songs }) {
  if (loading) return <LayoutLoader />;
  if (error) return <LayoutError error={error} />;

  return (
    <Layout title={draft ? 'Drafts' : 'Songs'} Fab={CreateSongButton}>
      <List>
        {songs.map(song => (
          <ListItem key={song.id} button component={Link} to={song.meta.url}>
            <ListItemText primary={song.title || <em>no title</em>} secondary={song.author || <em>no author</em>} />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}

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

  return <Songs loading={loading} error={error} songs={songs} draft={draft} />;
}

export default compose(
  withAuth,
  withRouter
)(SongsWrapper);
