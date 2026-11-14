import CustomSnackbar from './CustomSnackbar';

export default function ErrorSnackbar({ error, message }: { error?: Error | null; message?: string }) {
  const actualMessage = message || error?.message;
  if (!actualMessage) return null;
  return <CustomSnackbar message={actualMessage} autoHideDuration={8000} />;
}
