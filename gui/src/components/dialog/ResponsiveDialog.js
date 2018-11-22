import { withMobileDialog } from '@material-ui/core';
import React from 'react';
import FullScreenDialog from './FullScreenDialog';
import ModalDialog from './ModalDialog';

function ResponsiveDialog({ fullScreen, hide, children, ...props }) {
  const DialogType = fullScreen ? FullScreenDialog : ModalDialog;

  return (
    <DialogType {...props} hide={hide}>
      {children}
    </DialogType>
  );
}

export default withMobileDialog()(ResponsiveDialog);
