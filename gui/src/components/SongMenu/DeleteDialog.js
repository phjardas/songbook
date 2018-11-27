import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { withNotifications } from '../../providers/Notifications';
import CustomSnackbarContent from '../CustomSnackbarContent';

function DeleteDialog({ song, doc, history, addNotification, hide, classes, open, onClose }) {
  const deleteSong = async () => {
    history.push(song.meta.draft ? '/drafts' : '/songs');

    await doc.delete();
    addNotification({
      autoHideDuration: 3000,
      content: <CustomSnackbarContent message="The song was deleted." variant="success" />,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Song</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete the song <strong>{song.title}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancel</Button>
        <Button onClick={deleteSong} className={classes.deleteButton}>
          Delete Song
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = ({ palette }) => ({
  deleteButton: {
    color: palette.error.main,
  },
});

export default compose(
  withStyles(styles),
  withRouter,
  withNotifications
)(DeleteDialog);
