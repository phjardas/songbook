import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import Logo from './Logo';

/** Centered single-column screen for signing in and app start-up. */
export default function SmallLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', px: 3, py: 6 }}>
      <Box sx={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: '28px',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'm3.primaryContainer',
            color: 'm3.onPrimaryContainer',
            mb: 3,
          }}
        >
          <Logo width={44} height={44} />
        </Box>
        <Box component="h1" sx={{ typography: 'h3', fontWeight: 500, m: 0 }}>
          Songbook
        </Box>
        <Box sx={{ width: '100%', mt: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
