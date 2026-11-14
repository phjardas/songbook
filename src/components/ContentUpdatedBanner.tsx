import { Close as CloseIcon } from '@mui/icons-material';
import { Button, IconButton, Snackbar } from '@mui/material';
import { useState } from 'react';

export default function ContentUpdatedBanner({ reload }: { reload: () => void }) {
  const [show, setShow] = useState(true);

  return (
    <Snackbar
      open={show}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{ bottom: { xs: 96, md: 24 }, left: { md: 120 } }}
      message="A new version of Songbook is available"
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
