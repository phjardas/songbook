import { Snackbar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

export default function CustomSnackbar({ children }) {
  const [timer, setTimer] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    window.clearTimeout(timer);
    setTimer(null);
    setOpen(false);
  };

  useEffect(() => {
    const autoHideDuration = 6000;
    const timer = window.setTimeout(handleClose, autoHideDuration);
    setTimer(timer);
    return () => window.clearTimeout(timer);
  });

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
