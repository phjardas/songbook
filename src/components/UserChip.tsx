import { Avatar, Chip } from '@mui/material';
import UserInfo from './UserInfo';

export default function UserChip({ id }: { id: string }) {
  return (
    <UserInfo id={id}>
      {({ user }) =>
        user ? (
          <Chip
            variant="outlined"
            avatar={<Avatar src={user.photoURL ?? undefined}>{user.label?.[0]}</Avatar>}
            label={`Transcribed by ${user.label}`}
          />
        ) : null
      }
    </UserInfo>
  );
}
