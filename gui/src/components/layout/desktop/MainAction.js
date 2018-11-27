import { withStyles } from '@material-ui/core';
import React from 'react';
import CreateSongButton from '../../CreateSongButton';

function MainAction({ className = '', classes }) {
  return <CreateSongButton withLabel={true} variant="extendedFab" className={className} classes={classes} />;
}

const styles = ({ palette, spacing, shadows }) => ({
  root: {
    backgroundColor: palette.background.paper,
    color: palette.text.primary,
    textTransform: 'none',
    letterSpacing: 0.25,
    boxShadow: shadows[1],
    '&:hover': {
      backgroundColor: palette.background.paper,
      boxShadow: shadows[4],
    },
  },
  icon: {
    marginRight: spacing.unit,
    color: palette.primary.main,
  },
});

export default withStyles(styles)(MainAction);
