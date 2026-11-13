import { withMobileDialog } from '@material-ui/core';
import { useState } from 'react';

function ModalController({ fullScreen, children }) {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  return children({ fullScreen, open, show, onClose: hide, hide });
}

export default withMobileDialog()(ModalController);
