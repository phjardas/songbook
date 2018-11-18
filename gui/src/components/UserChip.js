import { Avatar, Chip } from '@material-ui/core';
import React from 'react';
import UserInfo from './UserInfo';

export default function UserChip({ id, ...props }) {
  return (
    <UserInfo id={id}>
      {({ user }) => (user ? <Chip label={user.label} avatar={<Avatar src={user.photoURL}>{user.label}</Avatar>} {...props} /> : null)}
    </UserInfo>
  );
}
