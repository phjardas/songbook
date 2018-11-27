import { AppBar, IconButton, SwipeableDrawer, Toolbar, Typography, withStyles, Zoom } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import Footer from '../Footer';
import MainMenu from './MainMenu';

function MobileLayout({ Fab, back, title, children, theme, classes }) {
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
      <SwipeableDrawer open={drawerOpen} onClose={closeDrawer} onOpen={openDrawer}>
        <MainMenu onClose={closeDrawer} />
      </SwipeableDrawer>

      <AppBar position="sticky" elevation={appBarElevation} className={classes.appbar}>
        <Toolbar>
          <IconButton color="inherit" onClick={openDrawer}>
            <MenuIcon />
          </IconButton>

          <Link to={back || '/'} className={classes.title}>
            <Typography variant="h6" color="inherit">
              {title || 'Songbook'}
            </Typography>
          </Link>

          {Fab && (
            <div key={title} className={classes.fab}>
              <Zoom in={true} timeout={theme.transitions.duration.enteringScreen}>
                <Fab variant="fab" color="secondary" />
              </Zoom>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <main>{children}</main>

      <Footer />
    </>
  );
}

const styles = ({ spacing, transitions }) => ({
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
  fab: {
    position: 'fixed',
    bottom: spacing.unit * 2,
    right: spacing.unit * 2,
  },
});

export default compose(withStyles(styles, { withTheme: true }))(MobileLayout);
