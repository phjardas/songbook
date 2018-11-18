import React from 'react';
import { QRCode } from 'react-qr-svg';
import { withStyles } from '@material-ui/core';

function PageQR({ classes, ...props }) {
  return <QRCode bgColor="#FFFFFF" fgColor="#000000" level="L" value={window.location.href} className={classes.qr} {...props} />;
}

const styles = {
  qr: {
    float: 'right',
    width: 100,
    height: 100,
    marginLeft: 50,
    marginBottom: 50,
    '@media screen': {
      display: 'none',
    },
  },
};

export default withStyles(styles)(PageQR);
