import { Hidden } from '@material-ui/core';
import React from 'react';
import Helmet from 'react-helmet';
import DesktopLayout from './desktop';
import MobileLayout from './mobile';

function Layout(props) {
  return (
    <>
      <Helmet titleTemplate="%s - Songbook" title={props.title} defaultTitle="Songbook" />

      <Hidden smDown>
        <DesktopLayout {...props} />
      </Hidden>

      <Hidden mdUp>
        <MobileLayout {...props} />
      </Hidden>
    </>
  );
}

export default Layout;
