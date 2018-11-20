import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, withMobileDialog, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { firestore } from '../firebase';
import { withNotifications } from '../providers/Notifications';
import CustomSnackbarContent from './CustomSnackbarContent';

let DeleteSong = ({ song, history, fullScreen, children, addNotification, classes }) => {
  const [modalShown, setModalShown] = useState(false);

  const showModal = () => setModalShown(true);
  const hideModal = () => setModalShown(false);

  const deleteSong = async () => {
    history.push('/songs');

    await firestore
      .collection('songs')
      .doc(song.id)
      .delete();

    addNotification({
      autoHideDuration: 3000,
      content: <CustomSnackbarContent message="The song was deleted." variant="success" />,
    });
  };

  return (
    <>
      {children({ onClick: showModal })}
      <Dialog open={modalShown} fullScreen={fullScreen} onClose={hideModal}>
        <DialogTitle>Delete Song</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete the song <strong>{song.title}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideModal}>Cancel</Button>
          <Button onClick={deleteSong} className={classes.deleteButton}>
            Delete Song
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const styles = ({ palette }) => ({
  deleteButton: {
    color: palette.error.main,
  },
});

export default compose(
  withStyles(styles),
  withMobileDialog(),
  withRouter,
  withNotifications()
)(DeleteSong);
