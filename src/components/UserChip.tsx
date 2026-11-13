import { Avatar, Chip } from '@mui/material';
import UserInfo from './UserInfo';

export default function UserChip({ id }: { id: string }) {
  return (
    <UserInfo id={id}>
      {({ user }) => (user ? <Chip label={user.label} avatar={<Avatar src={user.photoURL ?? undefined}>{user.label}</Avatar>} /> : null)}
    </UserInfo>
  );
}
