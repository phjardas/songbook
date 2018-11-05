import React from 'react';
import { Query } from 'react-apollo';
import { Alert } from 'reactstrap';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PaddedContent from '../components/PaddedContent';
import PageQR from '../components/PageQR';
import { songQuery } from './queries';
import SongLyrics from './SongLyrics';

function Song({ song }) {
  return (
    <>
      <PageQR />
      <h1 className="mb-0">{song.title}</h1>
      <h2 className="mb-3">
        <small className="text-muted">by {song.author}</small>
      </h2>

      <SongLyrics songId={song.id} />
    </>
  );
}

export default ({
  match: {
    params: { songId },
  },
}) => {
  return (
    <Query query={songQuery} variables={{ id: songId }}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <Layout title="loading…" icon="chevron-left">
              <PaddedContent>
                <Loading />
              </PaddedContent>
            </Layout>
          );

        if (error)
          return (
            <Layout title="Error" icon="chevron-left">
              <PaddedContent>
                <Alert color="danger">Error: {error.message}</Alert>
              </PaddedContent>
            </Layout>
          );

        return (
          <Layout title={data.song.title} icon="chevron-left">
            <PaddedContent>
              <Song song={data.song} />
            </PaddedContent>
          </Layout>
        );
      }}
    </Query>
  );
};
