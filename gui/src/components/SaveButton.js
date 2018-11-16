import { Button, CircularProgress, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Check as CheckIcon, Save as SaveIcon } from '@material-ui/icons';
import React from 'react';

function SaveButton({ saving, saved, valid, classes, ...props }) {
  if (saving) {
    return (
      <Button variant="contained" color="primary" disabled={true} className={classes.button} {...props}>
        <CircularProgress size={24} color="inherit" className={classes.icon} />
        Saving…
      </Button>
    );
  }

  if (saved) {
    return (
      <Button type="submit" variant="contained" className={`${classes.button} ${classes.success}`} {...props}>
        <CheckIcon className={classes.icon} />
        Saved!
      </Button>
    );
  }

  return (
    <Button type="submit" variant="contained" color="primary" disabled={!valid} className={classes.button} {...props}>
      <SaveIcon className={classes.icon} />
      Save
    </Button>
  );
}

const styles = ({ spacing }) => ({
  icon: {
    marginRight: spacing.unit,
  },
  button: {
    transition: ['color linear 300ms', 'background-color linear 300ms'],
  },
  success: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
});

export default withStyles(styles)(SaveButton);
