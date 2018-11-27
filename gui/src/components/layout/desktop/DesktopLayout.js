import { AppBar, Drawer, Toolbar, withStyles } from '@material-ui/core';
import React from 'react';
import { compose } from 'recompose';
import Footer from '../Footer';
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

      <Footer />
    </>
  );
}

const styles = ({ palette }) => ({
  appbar: {
    backgroundColor: palette.background.paper,
    color: palette.text.primary,
    borderBottom: `1px solid ${palette.divider}`,
  },
  drawer: {
    marginTop: 65,
  },
  main: {
    marginLeft: drawerWidth,
    marginTop: 65,
  },
});

export default compose(withStyles(styles))(DesktopLayout);
