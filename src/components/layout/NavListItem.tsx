import { ListItemButton } from '@mui/material';
import type { ReactNode } from 'react';
import { Link, useMatch } from 'react-router';

export default function NavListItem({ to, children, onClick }: { to: string; children: ReactNode; onClick?: () => void }) {
  const selected = !!useMatch({ path: to, end: false });

  return (
    <ListItemButton component={Link} to={to} selected={selected} onClick={onClick}>
      {children}
    </ListItemButton>
  );
}
