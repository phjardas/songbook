import gql from 'graphql-tag';

const songFragment = gql`
  fragment SongDetails on Song {
    id
    title
    author
  }
`;

export const songsQuery = gql`
  query Songs {
    songs {
      ...SongDetails
    }
  }

  ${songFragment}
`;

export const songQuery = gql`
  query Song($id: ID!) {
    song(id: $id) {
      ...SongDetails
    }
  }

  ${songFragment}
`;

export const songLyricsQuery = gql`
  query SongLyrics($id: ID!) {
    song(id: $id) {
      id
      lyrics
      key
    }
  }
`;
