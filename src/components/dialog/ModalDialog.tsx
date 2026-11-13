import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { DialogProps } from './ResponsiveDialog';

export default function ModalDialog({ title, children, hide, ...props }: DialogProps) {
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
