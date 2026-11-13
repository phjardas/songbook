import { useIsDesktop } from '../../providers/Theme';
import FullScreenDialog from './FullScreenDialog';
import type { ReactNode } from 'react';
import ModalDialog from './ModalDialog';

export interface DialogProps {
  open: boolean;
  hide: () => void;
  title: ReactNode;
  children: ReactNode;
}

export default function ResponsiveDialog(props: DialogProps) {
  const DialogType = useIsDesktop() ? ModalDialog : FullScreenDialog;
  return <DialogType {...props} />;
}
