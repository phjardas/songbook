import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { deleteDoc, type DocumentReference } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useNotifications } from '../../providers/Notifications';
import type { Song, SongData } from '../../types';

interface Props {
  song: Song;
  doc: DocumentReference<SongData>;
  open: boolean;
  hide: () => void;
}

export default function DeleteDialog({ song, doc, open, hide }: Props) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const deleteSong = async () => {
    navigate(song.meta.draft ? '/drafts' : '/songs');
    await deleteDoc(doc);
    addNotification({ message: 'Song deleted' });
  };

  return (
    <Dialog open={open} onClose={hide} maxWidth="xs">
      <DialogTitle>Delete song?</DialogTitle>
      <DialogContent>
        <DialogContentText>“{song.title || 'Untitled'}” will be deleted for everyone. This cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancel</Button>
        <Button onClick={deleteSong} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
