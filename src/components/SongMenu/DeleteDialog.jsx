import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useNotifications } from '../../providers/Notifications';
import CustomSnackbarContent from '../CustomSnackbarContent';

export default function DeleteDialog({ song, doc, open, hide }) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const deleteSong = async () => {
    navigate(song.meta.draft ? '/drafts' : '/songs');
    await deleteDoc(doc);
    addNotification({
      autoHideDuration: 3000,
      content: <CustomSnackbarContent message="The song was deleted." variant="success" />,
    });
  };

  return (
    <Dialog open={open} onClose={hide}>
      <DialogTitle>Delete Song</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete the song <strong>{song.title}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancel</Button>
        <Button onClick={deleteSong} color="error">
          Delete Song
        </Button>
      </DialogActions>
    </Dialog>
  );
}
