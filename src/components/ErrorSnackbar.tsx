import CustomSnackbar from './CustomSnackbar';
import CustomSnackbarContent from './CustomSnackbarContent';

export default function ErrorSnackbar({ error, message }: { error?: Error | null; message?: string }) {
  const actualMessage = message || error?.message;
  if (!actualMessage) return null;

  return (
    <CustomSnackbar>
      <CustomSnackbarContent variant="error" message={actualMessage} />
    </CustomSnackbar>
  );
}
