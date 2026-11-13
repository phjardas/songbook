import { Box, CircularProgress, type SxProps, type Theme } from '@mui/material';

export default function Loading({ message = 'loading…', sx = [] }: { message?: string; sx?: SxProps<Theme> }) {
  return (
    <Box sx={[{ display: 'flex', flexDirection: 'column', alignItems: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <CircularProgress color="secondary" />
      <Box component="span" sx={{ mt: 1, typography: 'body1' }}>
        {message}
      </Box>
    </Box>
  );
}
