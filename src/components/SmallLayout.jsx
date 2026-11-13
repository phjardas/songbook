import { Paper, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import Logo from './Logo';

function SmallLayout({ classes, children }) {
  return (
    <div className={classes.main}>
      <Paper className={classes.paper}>
        <Logo className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Songbook
        </Typography>
        <div className={classes.content}>{children}</div>
      </Paper>
    </div>
  );
}

const styles = ({ spacing, breakpoints, palette }) => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: spacing.unit * 3,
    marginRight: spacing.unit * 3,
    transition: 'width ease-out 300ms',
    [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
      maxWidth: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
  },
  avatar: {
    margin: spacing.unit,
    color: palette.primary.main,
  },
  content: {
    marginTop: spacing.unit * 2,
  },
});

export default withStyles(styles)(SmallLayout);
