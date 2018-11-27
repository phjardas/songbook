import { withStyles } from '@material-ui/core';
import React from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';
import Loading from '../components/Loading';
import SongEditor from '../components/SongEditor';
import { SongProvider, withSong } from '../providers/Song';

let EditSong = ({ loading, error, song, saveSong, classes }) => {
  if (loading) return <Loading className={classes.loading} />;
  if (error) return <ErrorSnackbar error={error} />;
  return <SongEditor song={song} saveSong={saveSong} className={classes.main} />;
};

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
  main: {
    padding: spacing.unit * 3,
  },
});

EditSong = withStyles(styles)(EditSong);

let EditSongWrapper = props => {
  const { song } = props;
  const back = song && (song.meta.draft ? `/drafts/${song.id}` : `/songs/${song.id}`);

  return (
    <Layout title={song && song.title} back={back}>
      <EditSong {...props} />
    </Layout>
  );
};

EditSongWrapper = withSong(EditSongWrapper);

export default props => (
  <SongProvider>
    <EditSongWrapper {...props} />
  </SongProvider>
);
