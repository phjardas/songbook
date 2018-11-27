import { withStyles } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import ButtonLink from '../components/ButtonLink';
import CustomSnackbarContent from '../components/CustomSnackbarContent';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';
import Loading from '../components/Loading';
import Song from '../components/Song';
import { withNotifications } from '../providers/Notifications';
import { SongProvider, withSong } from '../providers/Song';

function EditSongButton({ song }) {
  return (
    song.meta.owned &&
    (props => (
      <ButtonLink to={`${song.meta.url}/edit`} {...props}>
        <EditIcon />
      </ButtonLink>
    ))
  );
}

let SongContent = ({ loading, error, classes, ...props }) => {
  if (loading) return <Loading className={classes.loading} />;
  if (error) return <ErrorSnackbar error={error} />;
  return <Song {...props} />;
};

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
});

SongContent = withStyles(styles)(SongContent);

let SongWrapper = ({ history, addNotification, publishSong, unpublishSong, ...props }) => {
  const { song } = props;

  const doPublishSong = async () => {
    const published = await publishSong();
    history.push(published.meta.url);
    addNotification({
      autoHideDuration: 3000,
      content: <CustomSnackbarContent message="The song was published and removed from drafts." variant="success" />,
    });
  };

  const doUnpublishSong = async () => {
    const unpublished = await unpublishSong();
    history.push(unpublished.meta.url);
    addNotification({
      autoHideDuration: 3000,
      content: <CustomSnackbarContent message="The song was unpublished and moved to drafts." variant="success" />,
    });
  };

  return (
    <Layout title={song && song.title} Fab={song && EditSongButton({ song })}>
      <SongContent {...props} publishSong={doPublishSong} unpublishSong={doUnpublishSong} />
    </Layout>
  );
};

SongWrapper = compose(
  withRouter,
  withSong,
  withNotifications
)(SongWrapper);

export default props => (
  <SongProvider>
    <SongWrapper {...props} />
  </SongProvider>
);
