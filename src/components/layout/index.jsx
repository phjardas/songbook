import { Hidden, withStyles } from '@material-ui/core';
import React from 'react';
import Helmet from 'react-helmet';
import DesktopLayout from './desktop';
import MobileLayout from './mobile';

function Layout({ classes, ...props }) {
  return (
    <>
      <Helmet titleTemplate="%s - Songbook" title={props.title} defaultTitle="Songbook">
        <body className={classes.body} />
      </Helmet>

      <Hidden smDown>
        <DesktopLayout {...props} />
      </Hidden>

      <Hidden mdUp>
        <MobileLayout {...props} />
      </Hidden>
    </>
  );
}

const styles = ({ palette }) => ({
  body: {
    backgroundColor: palette.background.paper,
  },
});

export default withStyles(styles)(Layout);
