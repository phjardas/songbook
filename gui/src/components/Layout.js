import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography, withStyles, Paper } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Authenticated } from '../providers/Auth';
import Logo from './Logo';

function Layout({ title, back, user, signOut, classes, children }) {
  const [{ authMenuOpened, authMenuAnchor }, setAuthMenu] = useState({ authMenuOpened: false });

  const toggleAuthMenu = event => {
    event.preventDefault();
    setAuthMenu({ authMenuOpened: !authMenuOpened, authMenuAnchor: event.currentTarget });
  };

  const closeAuthMenu = () => setAuthMenu({ authMenuOpened: false, authMenuAnchor: undefined });

  const doSignOut = () => {
    closeAuthMenu();
    signOut();
  };

  return (
    <>
      <Helmet titleTemplate="%s - Songbook" title={title} defaultTitle="Songbook">
        <body className={classes.body} />
      </Helmet>

      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Link to={back || '/'} className={classes.title}>
            {back ? <ChevronLeftIcon className={classes.titleIcon} /> : <Logo className={`${classes.logo} ${classes.titleIcon}`} />}
            <Typography variant="h6" color="inherit">
              {title || 'Songbook'}
            </Typography>
          </Link>

          <>
            <IconButton onClick={toggleAuthMenu} color="inherit">
              {user.photoURL ? (
                <Avatar src={user.photoURL} />
              ) : (
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={authMenuAnchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={authMenuOpened}
              onClose={closeAuthMenu}
            >
              {user.displayName && <MenuItem>{user.displayName}</MenuItem>}
              {user.email && <MenuItem>{user.email}</MenuItem>}
              <MenuItem onClick={doSignOut}>SignOut</MenuItem>
            </Menu>
          </>
        </Toolbar>
      </AppBar>

      <Paper className={classes.main} square elevation={4}>
        {children}
      </Paper>
    </>
  );
}

const styles = ({ breakpoints, spacing }) => ({
  body: {
    background: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  appbar: {
    '@media print': {
      display: 'none',
    },
  },
  title: {
    display: 'flex',
    color: 'inherit',
    flexGrow: 1,
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    marginRight: spacing.unit,
  },
  titleIcon: {
    width: '1.2em',
    height: '1.2em',
  },
  main: {
    marginTop: spacing.unit * 8,
    [breakpoints.up('md')]: {
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const StyledLayout = withStyles(styles)(Layout);

export default props => <Authenticated>{({ user, signOut }) => <StyledLayout {...props} user={user} signOut={signOut} />}</Authenticated>;
