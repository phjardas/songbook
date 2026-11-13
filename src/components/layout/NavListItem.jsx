import { ListItemButton } from '@mui/material';
import { Link, useMatch } from 'react-router';

export default function NavListItem({ to, children, ...rest }) {
  const selected = !!useMatch({ path: to, end: false });

  return (
    <ListItemButton component={Link} to={to} selected={selected} {...rest}>
      {children}
    </ListItemButton>
  );
}
