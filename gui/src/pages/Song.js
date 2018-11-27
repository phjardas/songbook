import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import CustomSnackbarContent from '../components/CustomSnackbarContent';
import LayoutError from '../components/LayoutError';
import LayoutLoader from '../components/LayoutLoader';
import Song from '../components/Song';
import { withNotifications } from '../providers/Notifications';
import { SongProvider, withSong } from '../providers/Song';

let SongWrapper = ({ loading, error, history, addNotification, publishSong, unpublishSong, ...props }) => {
  if (loading) return <LayoutLoader />;
  if (error) return <LayoutError error={error} />;

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
