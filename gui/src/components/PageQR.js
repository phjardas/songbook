import React from 'react';
import { QRCode } from 'react-qr-svg';
import { withStyles } from '@material-ui/core';

function PageQR({ classes, ...props }) {
  return <QRCode bgColor="#FFFFFF" fgColor="#000000" level="L" value={window.location.href} className={classes.qr} {...props} />;
}

const styles = ({ spacing }) => ({
  qr: {
    float: 'right',
    width: spacing.unit * 12,
    height: spacing.unit * 12,
    margin: spacing.unit * 3,
    '@media screen': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(PageQR);
