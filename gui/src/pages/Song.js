import React from 'react';
import { Alert } from 'reactstrap';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PaddedContent from '../components/PaddedContent';
import PageQR from '../components/PageQR';
import SongLyrics from '../components/SongLyrics';
import { firestore } from '../firebase';
import { parseLyrics } from '../opensong';

function Song({ song }) {
  return (
    <>
      <PageQR />
      <h1 className="mb-0">{song.title}</h1>
      <h2 className="mb-3">
        <small className="text-muted">by {song.author}</small>
      </h2>

      <SongLyrics lyrics={parseLyrics(song.lyrics)} originalKey={song.key} />
    </>
  );
}

export default class SongWrapper extends React.Component {
  state = {
    loading: true,
    error: null,
    song: null,
    subscription: null,
  };

  render() {
    const { loading, error, song } = this.state;

    if (loading) {
      return (
        <Layout title="loading…" icon="chevron-left">
          <PaddedContent>
            <Loading />
          </PaddedContent>
        </Layout>
      );
    }

    if (error) {
      return (
        <Layout title="Error" icon="chevron-left">
          <PaddedContent>
            <Alert color="danger">Error: {error.message}</Alert>
          </PaddedContent>
        </Layout>
      );
    }

    return (
      <Layout title={song.title} icon="chevron-left">
        <PaddedContent>
          <Song song={song} />
        </PaddedContent>
      </Layout>
    );
  }

  async componentDidMount() {
    const {
      match: {
        params: { songId },
      },
    } = this.props;

    const subscription = firestore
      .collection('songs')
      .doc(songId)
      .onSnapshot({
        next: doc => {
          const song = { ...doc.data(), id: doc.id };
          this.setState({ loading: false, error: null, song });
        },
        error: error => this.setState({ loading: false, error, song: null }),
      });

    this.setState({ subscription });
  }

  componentWillUnmount() {
    const { subscription } = this.state;
    if (subscription) subscription();
  }
}
