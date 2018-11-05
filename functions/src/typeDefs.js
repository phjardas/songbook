import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    songs: [Song!]!
    song(id: ID!): Song
  }

  type Song {
    id: ID!
    title: String!
    author: String!
    lyrics: String!
  }
`;
