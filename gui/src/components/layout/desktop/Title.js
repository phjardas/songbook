import { withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';

function Title({ classes }) {
  return (
    <Link to="/" className={classes.root}>
      <Logo className={classes.logo} />
      Songbook
    </Link>
  );
}

const styles = ({ palette, spacing, typography }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    ...typography.h6,
    color: palette.text.secondary,
    fontWeight: 'normal',
    textDecoration: 'none',
  },
  logo: {
    width: '1.25em',
    height: '1.25em',
    marginRight: spacing.unit * 2,
    color: palette.primary.main,
  },
});

export default withStyles(styles)(Title);
