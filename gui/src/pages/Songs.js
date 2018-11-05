import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Alert, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PaddedContent from '../components/PaddedContent';
import { songLyricsQuery, songsQuery } from './queries';

function Songs({ songs, preloadData }) {
  return (
    <ListGroup>
      {songs.map(song => (
        <ListGroupItem key={song.id} tag={Link} to={`/songs/${song.id}`} onMouseOver={() => preloadData(song)}>
          <ListGroupItemHeading>{song.title}</ListGroupItemHeading>
          <ListGroupItemText>by {song.author}</ListGroupItemText>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default () => {
  return (
    <Layout title="Songs">
      <PaddedContent>
        <Query query={songsQuery}>
          {({ loading, error, data, client }) => {
            if (loading) return <Loading />;
            if (error) return <Alert color="danger">Error: {error.message}</Alert>;
            return <Songs songs={data.songs} preloadData={({ id }) => client.query({ query: songLyricsQuery, variables: { id } })} />;
          }}
        </Query>
      </PaddedContent>
    </Layout>
  );
};
