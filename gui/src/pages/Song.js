import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Alert } from 'reactstrap';
import Layout from '../components/Layout';
import PaddedContent from '../components/PaddedContent';
import SongLyrics from './SongLyrics';

function Song({ song }) {
  return (
    <>
      <h1>
        {song.title} <small className="text-muted">by {song.author}</small>
      </h1>
      <SongLyrics songId={song.id} />
    </>
  );
}

const query = gql`
  query Song($id: ID!) {
    song(id: $id) {
      id
      title
      author
    }
  }
`;

export default ({
  match: {
    params: { songId },
  },
}) => {
  return (
    <Layout>
      <PaddedContent>
        <Query query={query} variables={{ id: songId }}>
          {({ loading, error, data }) => {
            if (loading) return <Alert color="info">loading</Alert>;
            if (error) return <Alert color="danger">Error: {error.message}</Alert>;
            return <Song song={data.song} />;
          }}
        </Query>
      </PaddedContent>
    </Layout>
  );
};
