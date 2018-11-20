import { Button, List, ListItem, ListItemText, withStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { firestore } from '../firebase';
import { WithAuth } from '../providers/Auth';

function Songs({ loading, error, songs, createSong, classes }) {
  if (loading) {
    return (
      <Layout title="Songs">
        <Loading message="Loading songs…" className={classes.loading} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Songs">
        <ErrorSnackbar error={error} />
      </Layout>
    );
  }

  if (!songs.length) {
    return (
      <Layout title="Songs">
        <em>You have no songs yet.</em>
      </Layout>
    );
  }
  return (
    <Layout
      title="Songs"
      fab={
        <Button variant="fab" color="secondary" onClick={createSong}>
          <AddIcon />
        </Button>
      }
    >
      <List>
        {songs.map(song => (
          <ListItem key={song.id} button component={Link} to={`/songs/${song.id}`}>
            <ListItemText primary={song.title || <em>no title</em>} secondary={song.author || <em>no author</em>} />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
});

const StyledSongs = withStyles(styles)(Songs);

class SongsWrapper extends React.Component {
  state = {
    loading: true,
    error: null,
    songs: null,
    subscription: null,
  };

  render() {
    return <StyledSongs {...this.state} createSong={this.createSong} />;
  }

  async componentDidMount() {
    const { user } = this.props;

    const subscription = firestore
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
          this.setState({ loading: false, error: null, songs });
        },
        error: error => this.setState({ loading: false, error, songs: null }),
      });

    this.setState({ subscription });
  }

  componentWillUnmount() {
    const { subscription } = this.state;
    if (subscription) subscription();
  }

  createSong = async () => {
    const { user, history } = this.props;

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
}

export default () => <WithAuth>{({ user }) => <Route>{({ history }) => <SongsWrapper user={user} history={history} />}</Route>}</WithAuth>;
