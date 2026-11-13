import { Snackbar } from '@mui/material';
import { type ReactElement, useState } from 'react';

export default function CustomSnackbar({
  autoHideDuration = 6000,
  onClose,
  children,
}: {
  autoHideDuration?: number;
  onClose?: () => void;
  children: ReactElement;
}) {
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
