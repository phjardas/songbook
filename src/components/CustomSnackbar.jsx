import { Snackbar } from '@mui/material';
import { useState } from 'react';

export default function CustomSnackbar({ autoHideDuration = 6000, onClose, children }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      {children}
    </Snackbar>
  );
}
