import { useIsDesktop } from '../../providers/Theme';
import FullScreenDialog from './FullScreenDialog';
import ModalDialog from './ModalDialog';

export default function ResponsiveDialog(props) {
  const DialogType = useIsDesktop() ? ModalDialog : FullScreenDialog;
  return <DialogType {...props} />;
}
