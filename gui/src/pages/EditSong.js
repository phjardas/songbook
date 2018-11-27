import { withStyles } from '@material-ui/core';
import React from 'react';
import { compose } from 'recompose';
import Layout from '../components/layout';
import LayoutError from '../components/LayoutError';
import LayoutLoader from '../components/LayoutLoader';
import SongEditor from '../components/SongEditor';
import { SongProvider, withSong } from '../providers/Song';

let EditSong = ({ loading, error, song, saveSong, classes }) => {
  if (loading) return <LayoutLoader />;
  if (error) return <LayoutError error={error} />;

  const back = song && (song.meta.draft ? `/drafts/${song.id}` : `/songs/${song.id}`);
  return (
    <Layout title={song && song.title} back={back}>
      <SongEditor song={song} saveSong={saveSong} className={classes.main} />
    </Layout>
  );
};

const styles = ({ spacing }) => ({
  main: {
    padding: spacing.unit * 3,
  },
});

EditSong = compose(
  withSong,
  withStyles(styles)
)(EditSong);

export default props => (
  <SongProvider>
    <EditSong {...props} />
  </SongProvider>
);
