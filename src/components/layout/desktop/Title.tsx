import { Box } from '@mui/material';
import { Link } from 'react-router';
import Logo from '../../Logo';

export default function Title() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        typography: 'h6',
        color: 'text.secondary',
        fontWeight: 'normal',
        textDecoration: 'none',
      }}
    >
      <Box component={Logo} sx={{ width: '1.25em', height: '1.25em', mr: 2, color: 'primary.main' }} />
      Songbook
    </Box>
  );
}
