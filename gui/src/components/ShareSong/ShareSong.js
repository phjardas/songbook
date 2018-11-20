import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, withMobileDialog } from '@material-ui/core';
import React, { useState } from 'react';
import { compose } from 'recompose';
import { firestore } from '../../firebase';
import { withAuth } from '../../providers/Auth';
import SharedUsers from './SharedUsers';
import ShareUser from './ShareUser';

function ShareSong({ song, user, fullScreen, children }) {
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
      {children({ onClick: showModal })}
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

export default compose(
  withMobileDialog(),
  withAuth()
)(ShareSong);
