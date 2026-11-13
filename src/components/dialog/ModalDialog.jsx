import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function ModalDialog({ title, children, hide, ...props }) {
  return (
    <Dialog onClose={hide} {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={hide}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
