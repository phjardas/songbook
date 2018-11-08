import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Error from '../components/Error';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PaddedContent from '../components/PaddedContent';
import SaveButton from '../components/SaveButton';
import SongLyrics from '../components/SongLyrics';
import { firestore } from '../firebase';
import { parseLyrics } from '../opensong';

function LyricsPreview({ lyrics }) {
  const parsedLyrics = parseLyrics(lyrics);
  return <SongLyrics lyrics={parsedLyrics} />;
}

class EditSong extends React.Component {
  state = {
    ...this.props.song,
    saving: false,
    saved: false,
    error: null,
  };

  render() {
    const { id, title, author, lyrics, key, saving, saved, error } = this.state;

    const updateField = field => e => this.setState({ [field]: e.target.value });

    return (
      <Form onSubmit={this.save}>
        <Row>
          <Col md={5}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" value={title} onChange={updateField('title')} disabled={saving} />
            </FormGroup>
          </Col>

          <Col md={5}>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input id="author" value={author} onChange={updateField('author')} disabled={saving} />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Label for="key">Key</Label>
              <Input id="key" value={key} onChange={updateField('key')} disabled={saving} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col sm={12} lg={6}>
            <h2>Lyrics</h2>
            <Input type="textarea" value={lyrics} style={{ height: 600, fontFamily: 'monospace' }} onChange={updateField('lyrics')} />
          </Col>
          <Col sm={12} lg={6}>
            <h2>Preview</h2>
            <div style={{ height: 600, overflow: 'auto' }}>
              <LyricsPreview lyrics={lyrics} />
            </div>
          </Col>
        </Row>

        {error && (
          <div className="mt-3">
            <Error message="Error saving song" error={error} />
          </div>
        )}

        <div className="mt-3 d-flex flex-row-reverse justify-content-start align-items-center">
          <SaveButton saving={saving} saved={saved} valid={title && author && lyrics} />
          <Link to={`/songs/${id}`} className="text-secondary mx-3">
            Cancel
          </Link>
        </div>
      </Form>
    );
  }

  save = async e => {
    e.preventDefault();
    this.setState({ saving: true, saved: false, error: null });

    try {
      const { id, title, author, lyrics, key } = this.state;
      const song = { id, title, author, lyrics, key };

      await this.props.saveSong(song);
      this.setState({ saving: false, saved: true, error: null });
      setTimeout(() => this.setState({ saved: false }), 3000);
    } catch (error) {
      this.setState({ saving: false, saved: false, error });
    }
  };
}

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
        <Layout title="loading…" icon="chevron-left" back={back}>
          <PaddedContent>
            <Loading />
          </PaddedContent>
        </Layout>
      );
    }

    if (error) {
      return (
        <Layout title="Error" icon="chevron-left" back={back}>
          <PaddedContent>
            <Alert color="danger">Error: {error.message}</Alert>
          </PaddedContent>
        </Layout>
      );
    }

    return (
      <Layout title={song.title} icon="chevron-left" back={back}>
        <PaddedContent>
          <EditSong song={song} saveSong={this.saveSong} />
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
