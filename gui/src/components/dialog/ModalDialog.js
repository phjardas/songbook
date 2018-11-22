import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

export default function ModalDialog({ title, children, hide, ...props }) {
  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={hide}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
