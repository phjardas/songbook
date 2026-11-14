import { Box, CircularProgress, type SxProps, type Theme } from '@mui/material';

export default function Loading({ message = 'Loading…', sx = [] }: { message?: string; sx?: SxProps<Theme> }) {
  return (
    <Box sx={[{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <CircularProgress />
      <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
        {message}
      </Box>
    </Box>
  );
}
