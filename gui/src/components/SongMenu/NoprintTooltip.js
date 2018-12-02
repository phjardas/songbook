import { Tooltip, withStyles } from '@material-ui/core';
import React from 'react';

function NoprintTooltip({ classes, ...props }) {
  return <Tooltip classes={classes} {...props} />;
}

const styles = {
  popper: {
    '@media print': {
      display: 'none',
    },
  },
};

export default withStyles(styles)(NoprintTooltip);
