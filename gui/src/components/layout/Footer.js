import { withStyles } from '@material-ui/core';
import React from 'react';

const commitHash = process.env.REACT_APP_GIT_SHA || 'aabbccd';

function Footer({ className = '', classes }) {
  return <footer className={`${className} ${classes.main}`}>Songbook v1.0.0 {commitHash}</footer>;
}

const styles = ({ spacing, typography }) => ({
  main: {
    ...typography.caption,
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px`,
    '@media print': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(Footer);
