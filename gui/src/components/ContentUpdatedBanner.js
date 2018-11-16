import React from 'react';
import { withStyles, Button, Paper, Slide } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';

function ContentUpdatedBanner({ show, classes }) {
  return (
    <Slide in={show} direction="up" mountOnEnter unmountOnExit>
      <Paper className={classes.banner}>
        <InfoIcon className={classes.icon} />
        The application has been updated.
        <Button color="primary" className={classes.button} onClick={() => window.location.reload()}>
          Please reload
        </Button>
      </Paper>
    </Slide>
  );
}

const styles = ({ spacing, palette, typography, zIndex }) => ({
  banner: {
    position: 'fixed',
    bottom: spacing.unit * 2,
    left: spacing.unit * 2,
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px`,
    zIndex: zIndex.snackbar,
    display: 'flex',
    alignItems: 'center',
    ...typography.body1,
  },
  icon: {
    marginRight: spacing.unit,
    color: palette.primary.light,
  },
  button: {
    marginLeft: spacing.unit,
  },
});

export default withStyles(styles)(ContentUpdatedBanner);
