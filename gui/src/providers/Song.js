import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuth } from './Auth';
import { getSongDocument } from './data';

let SongProvider = ({ songId, match, user, children }) => {
  const { path, params } = match;
  songId = songId || params.songId;
  const doc = getSongDocument({ songId, path, user });
  const [state, setState] = useState({ loading: true });

  const loadSong = async () => {
    try {
      setState({
        loading: false,
        error: null,
        ...doc,
        song: await doc.song,
      });
    } catch (error) {
      setState({ loading: false, error, song: null });
    }
  };

  useEffect(
    () => {
      loadSong();
    },
    [path, songId, user]
  );

  return children(state);
};

SongProvider = compose(
  withAuth,
  withRouter
)(SongProvider);

export default function withSong(Component) {
  return props => <SongProvider>{context => <Component {...context} {...props} />}</SongProvider>;
}
