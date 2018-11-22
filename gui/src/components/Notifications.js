import React from 'react';
import { withNotifications } from '../providers/Notifications';
import CustomSnackbar from './CustomSnackbar';

function Notifications({ notification }) {
  return (
    notification && (
      <CustomSnackbar autoHideDuration={notification.autoHideDuration} onClose={notification.onClose}>
        {notification.content}
      </CustomSnackbar>
    )
  );
}

export default withNotifications(Notifications);
