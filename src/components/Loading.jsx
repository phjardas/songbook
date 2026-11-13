import { Box, CircularProgress } from '@mui/material';

export default function Loading({ message = 'loading…', sx }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...sx }}>
      <CircularProgress color="secondary" />
      <Box component="span" sx={{ mt: 1, typography: 'body1' }}>
        {message}
      </Box>
    </Box>
  );
}
