import { Button, List, ListItem, ListItemText, withStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import { firestore } from '../firebase';
import { withAuth } from '../providers/Auth';
import { withPageData } from '../providers/PageData';

function Songs({ songs, createSong, setPageData }) {
  return (
    <List>
      {songs.map(song => (
        <ListItem key={song.id} button component={Link} to={`/songs/${song.id}`}>
          <ListItemText primary={song.title || <em>no title</em>} secondary={song.author || <em>no author</em>} />
        </ListItem>
      ))}
    </List>
  );
}

const StyledSongs = compose(withPageData)(Songs);

function SongsWrapper({ user, history, setPageData, classes }) {
  const [{ loading, error, songs }, setState] = useState({ loading: true });

  const createSong = async () => {
    const doc = await firestore.collection('songs').add({
      title: '',
      author: '',
      key: '',
      lyrics: '',
      owner: user.id,
      users: { [user.id]: 'true' },
    });

    history.push(`/songs/${doc.id}/edit`);
  };

  useEffect(() => {
    setPageData(
      {
        title: 'Songs',
        back: null,
        fab: (
          <Button variant="fab" color="secondary" onClick={createSong}>
            <AddIcon />
          </Button>
        ),
      },
      []
    );

    return firestore
      .collection('songs')
      .where(`users.${user.id}`, '==', 'true')
      .onSnapshot({
        next: snapshot => {
          const songs = snapshot.docs
            .map(doc => ({
              ...doc.data(),
              id: doc.id,
            }))
            .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
          setState({ loading: false, error: null, songs });
        },
        error: error => setState({ loading: false, error, songs: null }),
      });
  }, []);

  if (loading) return <Loading message="Loading songs…" className={classes.loading} />;
  if (error) return <ErrorSnackbar error={error} />;
  if (!songs.length) return <em>You have no songs yet.</em>;
  return <StyledSongs songs={songs} createSong={createSong} />;
}

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
});

export default compose(
  withStyles(styles),
  withAuth,
  withRouter,
  withPageData
)(SongsWrapper);
