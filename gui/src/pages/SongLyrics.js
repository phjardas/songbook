import React from 'react';
import { Query } from 'react-apollo';
import { Alert } from 'reactstrap';
import Loading from '../components/Loading';
import SongLyrics from '../components/SongLyrics';
import { parseLyrics } from '../opensong';
import { songLyricsQuery } from './queries';

export default ({ songId }) => {
  return (
    <Query query={songLyricsQuery} variables={{ id: songId }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <Alert color="danger">Error: {error.message}</Alert>;
        return <SongLyrics lyrics={parseLyrics(data.song.lyrics)} originalKey={data.song.key} />;
      }}
    </Query>
  );
};
