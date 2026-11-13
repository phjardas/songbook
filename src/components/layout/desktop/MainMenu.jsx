import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, Edit as EditIcon, MusicNote as MusicNoteIcon } from '@material-ui/icons';
import React from 'react';
import { compose } from 'recompose';
import { withAuth } from '../../../providers/Auth';
import Footer from '../Footer';
import NavListItem from '../NavListItem';
import MainAction from './MainAction';

export const drawerWidth = 256;

function DesktopMainMenu({ user, signOut, classes }) {
  return (
    <div className={classes.root}>
      <MainAction className={classes.mainAction} />

      <List className={classes.nav}>
        <NavListItem to="/songs">
          <ListItemIcon>
            <MusicNoteIcon />
          </ListItemIcon>
          <ListItemText inset primary="Songs" />
        </NavListItem>

        <NavListItem to="/drafts">
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText inset primary="Drafts" />
        </NavListItem>

        {user && (
          <>
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
          </>
        )}
      </List>

      <Footer className={classes.footer} />
    </div>
  );
}

const styles = ({ spacing }) => ({
  root: {
    width: drawerWidth,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  user: {
    height: 64,
  },
  userAvatar: {
    width: '1em',
    height: '1em',
    fontSize: 24,
  },
  mainAction: {
    margin: spacing.unit,
  },
  nav: {
    flex: 1,
  },
  footer: {},
});

export default compose(
  withStyles(styles),
  withAuth
)(DesktopMainMenu);
