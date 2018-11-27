import { AppBar, Drawer, Toolbar, withStyles } from '@material-ui/core';
import React from 'react';
import { compose } from 'recompose';
import MainMenu, { drawerWidth } from './MainMenu';
import Title from './Title';

function DesktopLayout({ classes, children }) {
  return (
    <>
      <Drawer open={true} variant="permanent" classes={{ paper: classes.drawer }}>
        <MainMenu />
      </Drawer>

      <AppBar elevation={0} className={classes.appbar}>
        <Toolbar>
          <Title />
        </Toolbar>
      </AppBar>

      <main className={classes.main}>{children}</main>
    </>
  );
}

const styles = ({ palette }) => ({
  appbar: {
    backgroundColor: palette.background.paper,
    color: palette.text.primary,
    borderBottom: `1px solid ${palette.divider}`,
    '@media print': {
      display: 'none',
    },
  },
  drawer: {
    marginTop: 65,
    height: 'calc(100% - 65px)',
    '@media print': {
      display: 'none',
      margin: 0,
    },
  },
  main: {
    marginLeft: drawerWidth,
    marginTop: 65,
    '@media print': {
      margin: 0,
    },
  },
});

export default compose(withStyles(styles))(DesktopLayout);
