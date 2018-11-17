import React from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import SongEditor from '../components/SongEditor';
import { firestore } from '../firebase';

export default class EditSongWrapper extends React.Component {
  state = {
    loading: true,
    error: null,
    song: null,
  };

  render() {
    const {
      match: {
        params: { songId },
      },
    } = this.props;
    const { loading, error, song } = this.state;
    const back = `/songs/${songId}`;

    if (loading) {
      return (
        <Layout back={back}>
          <Loading />
        </Layout>
      );
    }

    if (error) {
      return (
        <Layout back={back}>
          <ErrorSnackbar error={error} />
        </Layout>
      );
    }

    return (
      <Layout title={song.title} back={back}>
        <SongEditor song={song} saveSong={this.saveSong} />
      </Layout>
    );
  }

  async componentDidMount() {
    const {
      match: {
        params: { songId },
      },
    } = this.props;

    try {
      const doc = await firestore
        .collection('songs')
        .doc(songId)
        .get();

      this.setState({ loading: false, error: null, song: { ...doc.data(), id: doc.id } });
    } catch (error) {
      this.setState({ loading: false, error, song: null });
    }
  }

  saveSong = async song => {
    const {
      match: {
        params: { songId },
      },
    } = this.props;

    await firestore
      .collection('songs')
      .doc(songId)
      .update(song);
  };
}
