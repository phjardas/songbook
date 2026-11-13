import * as React from 'react';
import CustomSnackbar from './CustomSnackbar';
import CustomSnackbarContent from './CustomSnackbarContent';

export default function ErrorSnackbar({ error, message }) {
  const actualMessage = message || (error && error.message);
  if (!actualMessage) return null;

  return (
    <CustomSnackbar>
      <CustomSnackbarContent variant="error" message={actualMessage} />
    </CustomSnackbar>
  );
}
