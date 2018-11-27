import { withStyles } from '@material-ui/core';
import React from 'react';
import Logo from '../../Logo';

function Title({ classes }) {
  return (
    <div className={classes.root}>
      <Logo className={classes.logo} />
      Songbook
    </div>
  );
}

const styles = ({ palette, spacing, typography }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    ...typography.h6,
    color: palette.text.secondary,
    fontWeight: 'normal',
  },
  logo: {
    width: '1.25em',
    height: '1.25em',
    marginRight: spacing.unit * 2,
    color: palette.primary.main,
  },
});

export default withStyles(styles)(Title);
