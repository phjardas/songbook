import { AppBar, Drawer, Hidden, IconButton, SwipeableDrawer, Toolbar, Typography, withStyles, Zoom } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withNotifications } from '../providers/Notifications';
import { withPageData } from '../providers/PageData';
import Footer from './Footer';
import MainMenu, { drawerWidth } from './MainMenu';

function Layout({ pageData: { title, back, Fab } = {}, classes, theme, children }) {
  const [appBarElevation, setAppBarElevation] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setAppBarElevation(window.scrollY > 0 ? 4 : 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <Helmet titleTemplate="%s - Songbook" title={title} defaultTitle="Songbook" />

      <Hidden smDown>
        <Drawer open={true} variant="permanent" classes={{ paper: classes.drawerPermanent }}>
          <MainMenu onClose={closeDrawer} Fab={Fab} />
        </Drawer>
      </Hidden>

      <Hidden mdUp>
        <SwipeableDrawer open={drawerOpen} onClose={closeDrawer} onOpen={openDrawer}>
          <MainMenu onClose={closeDrawer} />
        </SwipeableDrawer>
      </Hidden>

      <AppBar position="sticky" elevation={appBarElevation} className={classes.appbar}>
        <Toolbar>
          <IconButton color="inherit" onClick={openDrawer} className={classes.menuIcon}>
            <MenuIcon />
          </IconButton>

          <Link to={back || '/'} className={classes.title}>
            <Typography variant="h6" color="inherit">
              {title || 'Songbook'}
            </Typography>
          </Link>

          <Hidden mdUp>
            {Fab && (
              <div key={title} className={classes.fab}>
                <Zoom in={true} timeout={theme.transitions.duration.enteringScreen}>
                  <Fab variant="fab" color="secondary" withLabel={false} />
                </Zoom>
              </div>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>{children}</main>

      <Footer />
    </>
  );
}

const styles = ({ breakpoints, spacing, transitions }) => ({
  appbar: {
    transition: `box-shadow ${transitions.easing.easeInOut} ${transitions.duration.standard}ms`,
    '@media print': {
      display: 'none',
    },
  },
  menuIcon: {
    [breakpoints.up('md')]: {
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
  fab: {
    position: 'fixed',
    bottom: spacing.unit * 2,
    right: spacing.unit * 2,
  },
  drawerPermanent: {
    [breakpoints.up('md')]: {
      marginTop: 64,
    },
  },
  main: {
    [breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
});

export default compose(
  withStyles(styles, { withTheme: true }),
  withNotifications,
  withPageData
)(Layout);
