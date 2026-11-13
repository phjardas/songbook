import { Close as CloseIcon } from '@mui/icons-material';
import { Button, IconButton, Snackbar } from '@mui/material';
import { useState } from 'react';

export default function ContentUpdatedBanner({ reload }) {
  const [show, setShow] = useState(true);

  return (
    <Snackbar
      open={show}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      message="The application has been updated"
      action={
        <>
          <Button color="secondary" size="small" onClick={reload}>
            Reload
          </Button>
          <IconButton color="inherit" onClick={() => setShow(false)} sx={{ p: 0.5 }} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </>
      }
    />
  );
}
