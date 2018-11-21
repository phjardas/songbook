import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React from 'react';
import { firestore } from '../../firebase';
import { withAuth } from '../../providers/Auth';
import SharedUsers from './ShareDialog/SharedUsers';
import ShareUser from './ShareDialog/ShareUser';

function ShareDialog({ song, user, hide, ...props }) {
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

  const sharedUserIds = Object.keys(song.users || {})
    .filter(u => u !== user.id)
    .sort();

  return (
    <Dialog {...props}>
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
        <Button onClick={hide}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default withAuth()(ShareDialog);
