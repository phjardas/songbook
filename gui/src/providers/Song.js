import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuth } from './Auth';
import { getSongDocument } from './data';

const Context = React.createContext();

function SongProviderImpl({ songId, match, user, children }) {
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

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

export const SongProvider = compose(
  withAuth,
  withRouter
)(SongProviderImpl);

export const WithSong = Context.Consumer;

export function withSong(Component) {
  return props => <WithSong>{context => <Component {...context} {...props} />}</WithSong>;
}
