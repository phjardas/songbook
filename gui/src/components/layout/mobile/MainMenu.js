import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, Edit as EditIcon, MusicNote as MusicNoteIcon } from '@material-ui/icons';
import React from 'react';
import { compose } from 'recompose';
import { withAuthentication } from '../../../providers/Auth';
import NavListItem from '../NavListItem';

function MobileMainMenu({ user, signOut, onClose, classes }) {
  return (
    <div className={classes.root}>
      <List>
        <NavListItem to="/songs" onClick={onClose}>
          <ListItemIcon>
            <MusicNoteIcon />
          </ListItemIcon>
          <ListItemText inset primary="Songs" />
        </NavListItem>
        <NavListItem to="/drafts" onClick={onClose}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText inset primary="Drafts" />
        </NavListItem>

        <Divider />

        <ListItem className={classes.user}>
          <ListItemIcon>
            {user.photoURL ? (
              <Avatar src={user.photoURL} className={classes.userAvatar} />
            ) : (
              <Avatar className={classes.userAvatar}>
                <AccountCircleIcon />
              </Avatar>
            )}
          </ListItemIcon>
          <ListItemText inset primary={user.displayName} secondary={user.email} />
        </ListItem>
        <ListItem button onClick={signOut}>
          <ListItemText inset primary="Sign out" />
        </ListItem>
      </List>
    </div>
  );
}

const styles = () => ({
  root: {
    width: 240,
  },
  user: {
    height: 56,
  },
  userAvatar: {
    width: '1em',
    height: '1em',
    fontSize: 24,
  },
});

export default compose(
  withStyles(styles),
  withAuthentication
)(MobileMainMenu);
