import { useNotifications } from '../providers/Notifications';
import CustomSnackbar from './CustomSnackbar';

export default function Notifications() {
  const { notification } = useNotifications();
  if (!notification) return null;

  return (
    // Keyed so that a new notification gets a fresh, open snackbar.
    <CustomSnackbar key={notification.id} autoHideDuration={notification.autoHideDuration} onClose={notification.onClose}>
      {notification.content}
    </CustomSnackbar>
  );
}
