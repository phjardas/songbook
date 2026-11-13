import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography, withStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React from 'react';

function SlideUp(props) {
  return <Slide direction="up" {...props} />;
}

function FullScreenDialog({ children, title, hide, classes, ...props }) {
  return (
    <Dialog {...props} fullScreen={true} TransitionComponent={SlideUp}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={hide} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.main}>{children}</div>
    </Dialog>
  );
}

const styles = ({ spacing }) => ({
  main: {
    padding: spacing.unit * 3,
  },
});

export default withStyles(styles)(FullScreenDialog);
