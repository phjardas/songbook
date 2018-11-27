import { ListItem } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';

export default function NavListItem({ exact, to, children, ...rest }) {
  return (
    <NavLink exact={exact} to={to}>
      {props => (
        <ListItem button component={Link} {...props} {...rest}>
          {children}
        </ListItem>
      )}
    </NavLink>
  );
}
