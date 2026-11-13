import { Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export default function CustomSnackbar({ autoHideDuration = 6000, onClose, children }) {
  const [timer, setTimer] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    window.clearTimeout(timer);
    setTimer(null);
    setOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    const timer = window.setTimeout(handleClose, autoHideDuration);
    setTimer(timer);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      onClose={handleClose}
    >
      {children}
    </Snackbar>
  );
}
