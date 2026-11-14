import { Logout } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useAuth, useUser } from '../../providers/Auth';

const version = `Version 1.0.0 (${import.meta.env.VITE_GIT_SHA || 'dev'})`;

export default function AccountMenu() {
  const user = useUser();
  const { signOut } = useAuth();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const initial = (user.displayName || user.email || '?')[0].toUpperCase();

  return (
    <>
      <Tooltip title="Account">
        <IconButton onClick={e => setAnchor(e.currentTarget)} aria-label="Account" sx={{ p: 0.5 }}>
          <Avatar
            src={user.photoURL ?? undefined}
            sx={{ width: 32, height: 32, bgcolor: 'm3.tertiaryContainer', color: 'm3.onTertiaryContainer' }}
          >
            {initial}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}>
        <Box sx={{ px: 2, py: 1 }}>
          <Box sx={{ typography: 'subtitle1' }}>{user.displayName}</Box>
          <Box sx={{ typography: 'body2', color: 'text.secondary' }}>{user.email}</Box>
        </Box>
        <Divider />
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
        <Box sx={{ px: 2, pt: 1, typography: 'caption', color: 'text.secondary' }}>{version}</Box>
      </Menu>
    </>
  );
}
