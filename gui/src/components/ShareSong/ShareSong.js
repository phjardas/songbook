import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, withMobileDialog } from '@material-ui/core';
import { Share as ShareIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { firestore } from '../../firebase';
import { WithAuth } from '../../providers/Auth';
import SharedUsers from './SharedUsers';
import ShareUser from './ShareUser';

function ShareSong({ song, user, fullScreen, ...rest }) {
  const [modalShown, setModalShown] = useState(false);

  const showModal = () => setModalShown(true);
  const hideModal = () => setModalShown(false);

  const shareUser = async userId => {
    const ref = firestore.collection('songs').doc(song.id);
    const doc = await ref.get();
    const users = { ...doc.data().users, [userId]: 'true' };
    await ref.update({ users });
  };

  const unshareUser = async userId => {
    const ref = firestore.collection('songs').doc(song.id);
    const doc = await ref.get();
    const users = { ...doc.data().users };
    delete users[userId];
    await ref.update({ users });
  };

  const sharedUserIds = Object.keys(song.users)
    .filter(u => u !== user.id)
    .sort();

  return (
    <>
      <IconButton {...rest} onClick={showModal}>
        <ShareIcon />
      </IconButton>
      <Dialog open={modalShown} fullScreen={fullScreen} onClose={hideModal}>
        <DialogTitle>Share Song</DialogTitle>
        <DialogContent>
          {sharedUserIds.length !== 0 ? (
            <SharedUsers userIds={sharedUserIds} unshareUser={unshareUser} />
          ) : (
            <Typography variant="body1">You're not sharing this song yet.</Typography>
          )}
          <ShareUser ownerId={song.owner} sharedUserIds={sharedUserIds} shareUser={shareUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const ResponsiveShareSong = withMobileDialog()(ShareSong);

export default props => <WithAuth>{({ user }) => <ResponsiveShareSong {...props} user={user} />}</WithAuth>;
