import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Alert, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import Layout from '../components/Layout';
import PaddedContent from '../components/PaddedContent';

function Songs({ songs }) {
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

const query = gql`
  query Songs {
    songs {
      id
      title
      author
    }
  }
`;

export default () => {
  return (
    <Layout>
      <PaddedContent>
        <h1>Songs</h1>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) return <Alert color="info">loading</Alert>;
            if (error) return <Alert color="danger">Error: {error.message}</Alert>;
            return <Songs songs={data.songs} />;
          }}
        </Query>
      </PaddedContent>
    </Layout>
  );
};
