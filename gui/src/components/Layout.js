import { AppBar, Avatar, IconButton, Menu, MenuItem, Paper, Toolbar, Typography, withStyles, Zoom } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Authenticated } from '../providers/Auth';
import Footer from './Footer';
import Logo from './Logo';

function Layout({ title, back, user, signOut, fab, classes, theme, children }) {
  const [appBarElevation, setAppBarElevation] = useState(0);
  const [{ authMenuOpened, authMenuAnchor }, setAuthMenu] = useState({ authMenuOpened: false });

  useEffect(() => {
    const onScroll = () => setAppBarElevation(window.scrollY > 0 ? 4 : 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <Helmet titleTemplate="%s - Songbook" title={title} defaultTitle="Songbook" />

      <div className={classes.wrapper}>
        <Paper square className={classes.paper} elevation={0}>
          <AppBar position="sticky" elevation={appBarElevation} className={classes.appbar}>
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

              {fab && (
                <div className={classes.fab}>
                  <Zoom in={true} timeout={theme.transitions.duration.enteringScreen}>
                    {fab}
                  </Zoom>
                </div>
              )}
            </Toolbar>
          </AppBar>

          {children}
        </Paper>

        <Footer />
      </div>
    </>
  );
}

const styles = ({ breakpoints, shadows, spacing, transitions }) => ({
  appbar: {
    transition: `box-shadow ${transitions.easing.easeInOut} ${transitions.duration.standard}ms`,
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
  fab: {
    position: 'fixed',
    bottom: spacing.unit * 2,
    right: spacing.unit * 2,
    [breakpoints.up('md')]: {
      position: 'absolute',
      bottom: -28,
      right: 100,
    },
  },
  paper: {
    [breakpoints.up('md')]: {
      boxShadow: shadows[2],
    },
  },
  wrapper: {
    [breakpoints.up('md')]: {
      maxWidth: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const StyledLayout = withStyles(styles, { withTheme: true })(Layout);

export default props => <Authenticated>{({ user, signOut }) => <StyledLayout {...props} user={user} signOut={signOut} />}</Authenticated>;
