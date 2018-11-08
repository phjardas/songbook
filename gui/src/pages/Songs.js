import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Alert, Button } from 'reactstrap';
import Error from '../components/Error';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PaddedContent from '../components/PaddedContent';
import { firestore } from '../firebase';
import { WithAuth } from '../providers/Auth';
import Route from 'react-router-dom/Route';

function Songs({ loading, error, songs }) {
  if (loading) return <Loading message="Loading songs…" />;
  if (error) return <Error error={error} />;
  if (!songs.length) return <Alert color="info">You have no songs yet.</Alert>;

  return (
    <ListGroup>
      {songs.map(song => (
        <ListGroupItem key={song.id} tag={Link} to={`/songs/${song.id}`}>
          <ListGroupItemHeading>{song.title || <em>no title</em>}</ListGroupItemHeading>
          <ListGroupItemText>by {song.author || <em>no author</em>}</ListGroupItemText>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

class SongsWrapper extends React.Component {
  state = {
    loading: true,
    error: null,
    songs: null,
    subscription: null,
  };

  render() {
    return (
      <Layout title="Songs">
        <PaddedContent>
          <p>
            <Button color="primary" onClick={this.createSong}>
              Create song
            </Button>
          </p>
          <Songs {...this.state} createSong={this.createSong} />
        </PaddedContent>
      </Layout>
    );
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
