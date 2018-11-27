import { withStyles } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import CustomSnackbarContent from '../components/CustomSnackbarContent';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';
import Loading from '../components/Loading';
import Song from '../components/Song';
import { withNotifications } from '../providers/Notifications';
import { SongProvider, withSong } from '../providers/Song';

let SongWrapper = ({ loading, error, history, addNotification, publishSong, unpublishSong, classes, ...props }) => {
  if (loading) {
    return (
      <Layout>
        <Loading className={classes.loading} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorSnackbar error={error} />
      </Layout>
    );
  }

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

  return <Song {...props} publishSong={doPublishSong} unpublishSong={doUnpublishSong} />;
};

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
});

SongWrapper = compose(
  withStyles(styles),
  withRouter,
  withSong,
  withNotifications
)(SongWrapper);

export default props => (
  <SongProvider>
    <SongWrapper {...props} />
  </SongProvider>
);
