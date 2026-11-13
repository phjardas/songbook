import { Box } from '@mui/material';

const commitHash = import.meta.env.VITE_GIT_SHA || 'aabbccd';

export default function Footer() {
  return (
    <Box component="footer" sx={{ typography: 'caption', py: 2, px: 3, '@media print': { display: 'none' } }}>
      Songbook v1.0.0 {commitHash}
    </Box>
  );
}
