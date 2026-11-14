import { Box, CircularProgress } from '@mui/material';

export default function GlobalLoader() {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}>
      <CircularProgress aria-label="Loading" />
    </Box>
  );
}
