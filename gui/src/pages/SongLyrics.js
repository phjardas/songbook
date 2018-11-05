import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Alert } from 'reactstrap';
import SongLyrics from '../components/SongLyrics';
import { parseLyrics } from '../opensong';

const query = gql`
  query SongLyrics($id: ID!) {
    song(id: $id) {
      id
      lyrics
      key
    }
  }
`;

export default ({ songId }) => {
  return (
    <Query query={query} variables={{ id: songId }}>
      {({ loading, error, data }) => {
        if (loading) return <Alert color="info">loading</Alert>;
        if (error) return <Alert color="danger">Error: {error.message}</Alert>;
        return <SongLyrics lyrics={parseLyrics(data.song.lyrics)} originalKey={data.song.key} />;
      }}
    </Query>
  );
};
