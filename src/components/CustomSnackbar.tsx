import { Snackbar } from '@mui/material';
import { useState } from 'react';
import { useIsDesktop } from '../theme';

export default function CustomSnackbar({
  message,
  autoHideDuration = 4000,
  onClose,
}: {
  message: string;
  autoHideDuration?: number;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(true);
  const isDesktop = useIsDesktop();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: isDesktop ? 'left' : 'center' }}
      open={open}
      message={message}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      // Clear the navigation bar on phones.
      sx={{ bottom: { xs: 96, md: 24 }, left: { md: 120 } }}
    />
  );
}
