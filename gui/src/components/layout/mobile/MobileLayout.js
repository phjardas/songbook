import { AppBar, IconButton, SwipeableDrawer, Toolbar, withStyles, Zoom } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon, Menu as MenuIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import ButtonLink from '../../ButtonLink';
import Footer from '../Footer';
import MainMenu from './MainMenu';

function MobileLayout({ Fab, Actions, back, title, children, theme, classes }) {
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
        <Toolbar className={classes.toolbar}>
          {back ? (
            <ButtonLink key="icon" Component={IconButton} to={back} color="inherit" className={classes.icon}>
              <ArrowBackIcon />
            </ButtonLink>
          ) : (
            <IconButton key="icon" color="inherit" onClick={openDrawer} className={classes.icon}>
              <MenuIcon />
            </IconButton>
          )}

          <Link to={back || '/'} className={classes.title}>
            {title || 'Songbook'}
          </Link>

          {Actions && <Actions />}

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

const styles = ({ spacing, transitions, typography }) => ({
  appbar: {
    transition: `box-shadow ${transitions.easing.easeInOut} ${transitions.duration.standard}ms`,
    '@media print': {
      display: 'none',
    },
  },
  toolbar: {
    flex: 1,
    display: 'flex',
  },
  title: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    ...typography.h6,
    color: 'inherit',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    marginLeft: -12,
  },
  fab: {
    position: 'fixed',
    bottom: spacing.unit * 2,
    right: spacing.unit * 2,
    '@media print': {
      display: 'none',
    },
  },
});

export default compose(withStyles(styles, { withTheme: true }))(MobileLayout);
