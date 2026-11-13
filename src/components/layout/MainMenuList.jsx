import { AccountCircle as AccountCircleIcon, Edit as EditIcon, MusicNote as MusicNoteIcon } from '@mui/icons-material';
import { Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useAuth } from '../../providers/Auth';
import NavListItem from './NavListItem';

const avatarSx = { width: '1em', height: '1em', fontSize: 24 };

export default function MainMenuList({ onNavigate, userHeight, sx }) {
  const { user, signOut } = useAuth();

  return (
    <List sx={sx}>
      <NavListItem to="/songs" onClick={onNavigate}>
        <ListItemIcon>
          <MusicNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Songs" />
      </NavListItem>
      <NavListItem to="/drafts" onClick={onNavigate}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </NavListItem>

      {user && (
        <>
          <Divider />
          <ListItem sx={{ height: userHeight }}>
            <ListItemIcon>
              <Avatar src={user.photoURL} sx={avatarSx}>
                {!user.photoURL && <AccountCircleIcon />}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={user.displayName} secondary={user.email} />
          </ListItem>
          <ListItemButton onClick={signOut}>
            <ListItemText inset primary="Sign out" />
          </ListItemButton>
        </>
      )}
    </List>
  );
}
