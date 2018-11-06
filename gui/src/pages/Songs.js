import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PaddedContent from '../components/PaddedContent';
import { firestore } from '../firebase';

function Songs({ loading, error, songs }) {
  if (loading) return <Loading message="Loading songs…" />;
  if (error) return <Alert color="danger">Error: {error.message}</Alert>;

  return (
    <ListGroup>
      {songs.map(song => (
        <ListGroupItem key={song.id} tag={Link} to={`/songs/${song.id}`}>
          <ListGroupItemHeading>{song.title}</ListGroupItemHeading>
          <ListGroupItemText>by {song.author}</ListGroupItemText>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default class SongsWrapper extends React.Component {
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
          <Songs {...this.state} />
        </PaddedContent>
      </Layout>
    );
  }

  async componentDidMount() {
    const subscription = firestore.collection('songs').onSnapshot({
      next: snapshot => {
        const songs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => a.title.localeCompare(b.title));
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
}
