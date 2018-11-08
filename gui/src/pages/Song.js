import React from 'react';
import Link from 'react-router-dom/Link';
import { Alert } from 'reactstrap';
import FontAwesome from '../components/FontAwesome';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PaddedContent from '../components/PaddedContent';
import PageQR from '../components/PageQR';
import ShareSong from '../components/ShareSong';
import SongLyrics from '../components/SongLyrics';
import UserInfo from '../components/UserInfo';
import { firestore } from '../firebase';
import { parseLyrics } from '../opensong';
import { WithAuth } from '../providers/Auth';

function Song({ song }) {
  return (
    <>
      <PageQR />
      <h1 className="mb-0">{song.title}</h1>
      <h2 className="mb-3">
        <small className="text-muted">by {song.author}</small>
      </h2>

      {song.isOwner ? (
        <div className="d-print-none">
          <Link to={`/songs/${song.id}/edit`} className="btn btn-outline-primary">
            <FontAwesome icon="edit" className="mr-2" />
            Edit
          </Link>
          <ShareSong song={song} color="primary" outline className="mx-2" />
        </div>
      ) : (
        <p>
          <small>
            <UserInfo id={song.owner}>{user => <span className="text-muted">Shared by {user.label}</span>}</UserInfo>
          </small>
        </p>
      )}

      <SongLyrics lyrics={parseLyrics(song.lyrics)} originalKey={song.key} />
    </>
  );
}

class SongWrapper extends React.Component {
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
    const { user, songId } = this.props;

    const subscription = firestore
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

export default ({
  match: {
    params: { songId },
  },
}) => <WithAuth>{({ user }) => <SongWrapper songId={songId} user={user} />}</WithAuth>;
