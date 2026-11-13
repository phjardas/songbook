import { Box, Paper, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import Logo from './Logo';

export default function SmallLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ mx: 3, '@media (min-width: 448px)': { maxWidth: 400, mx: 'auto' } }}>
      <Paper sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, px: 3, pb: 3 }}>
        <Box component={Logo} sx={{ m: 1, color: 'primary.main' }} />
        <Typography component="h1" variant="h5">
          Songbook
        </Typography>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Paper>
    </Box>
  );
}
