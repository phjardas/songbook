import { Avatar, CircularProgress, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import UserInfo from '../../UserInfo';

function SharedUser({ userId, unshareUser }) {
  const [unsharing, setUnsharing] = useState(false);

  const unshare = () => {
    setUnsharing(true);
    unshareUser(userId);
  };

  return (
    <ListItem key={userId}>
      <UserInfo id={userId}>
        {({ user }) =>
          user ? (
            <>
              <Avatar src={user.photoURL}>{user.label}</Avatar>
              <ListItemText primary={user.label} />
            </>
          ) : (
            <ListItemText primary="loading" />
          )
        }
      </UserInfo>
      <ListItemSecondaryAction>
        {unsharing ? (
          <CircularProgress />
        ) : (
          <IconButton onClick={unshare}>
            <DeleteIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default function SharedUsers({ userIds, unshareUser }) {
  return (
    <>
      <Typography variant="body1">This song is currently shared with the following users:</Typography>
      <List>
        {userIds.map(userId => (
          <SharedUser key={userId} userId={userId} unshareUser={unshareUser} />
        ))}
      </List>
    </>
  );
}
