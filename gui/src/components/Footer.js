import { withStyles } from '@material-ui/core';
import React from 'react';

const commitHash = process.env.REACT_APP_GIT_SHA || 'aabbccd';

function Footer({ classes }) {
  return <div className={classes.main}>Songbook v1.0.0 {commitHash}</div>;
}

const styles = ({ spacing, typography }) => ({
  main: {
    ...typography.caption,
    textAlign: 'right',
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px`,
    '@media print': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(Footer);
