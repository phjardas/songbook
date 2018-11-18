import { CircularProgress, withStyles } from '@material-ui/core';
import React from 'react';

function Loading({ message = 'loading…', classes, className }) {
  return (
    <div className={`${classes.main} ${className}`}>
      <CircularProgress color="secondary" className={classes.progress} />
      <span className={classes.message}>{message}</span>
    </div>
  );
}

const styles = ({ spacing, typography }) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progress: {},
  message: {
    marginTop: spacing.unit,
    ...typography.body1,
  },
});

export default withStyles(styles)(Loading);
