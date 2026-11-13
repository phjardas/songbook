import { Button, Snackbar, IconButton, withStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { useState } from 'react';

function ContentUpdatedBanner({ reload, classes }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Snackbar
      open={show}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      message="The application has been updated"
      action={[
        <Button key="reload" color="secondary" size="small" onClick={reload}>
          Reload
        </Button>,
        <IconButton key="close" color="inherit" onClick={handleClose} className={classes.close}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

const styles = ({ spacing }) => ({ close: { padding: spacing.unit / 2 } });

export default withStyles(styles)(ContentUpdatedBanner);
