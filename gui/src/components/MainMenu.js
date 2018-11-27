import { Avatar, List, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, Create as CreateIcon, Edit as EditIcon, MusicNote as MusicNoteIcon } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthentication } from '../providers/Auth';

export const drawerWidth = 240;

function MainMenu({ user, signOut, onClose, classes }) {
  console.log('classes:', classes);
  return (
    <div className={classes.root}>
      <ButtonLink to="/songs/_new" variant="extendedFab" color="secondary" className={classes.mainAction}>
        <CreateIcon className={classes.mainActionIcon} />
        Create song
      </ButtonLink>

      <List>
        <ListItem button component={NavLink} to="/songs" onClick={onClose}>
          <ListItemIcon>
            <MusicNoteIcon />
          </ListItemIcon>
          <ListItemText inset primary="Songs" />
        </ListItem>
        <ListItem button component={NavLink} to="/drafts" onClick={onClose}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText inset primary="Drafts" />
        </ListItem>
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

const styles = ({ breakpoints, spacing }) => ({
  root: {
    width: drawerWidth,
  },
  user: {
    height: 56,
    [breakpoints.up('sm')]: {
      height: 64,
    },
  },
  userAvatar: {
    width: '1em',
    height: '1em',
    fontSize: 24,
  },
  fab: {
    margin: spacing.unit,
  },
  fabIcon: {
    marginRight: spacing.unit,
  },
});

export default compose(
  withStyles(styles),
  withAuthentication
)(MainMenu);