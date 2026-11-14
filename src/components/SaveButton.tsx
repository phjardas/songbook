import { Check as CheckIcon } from '@mui/icons-material';
import { Button, type ButtonProps, CircularProgress } from '@mui/material';

interface Props extends ButtonProps {
  saving?: boolean;
  saved?: boolean;
  valid: boolean;
}

export default function SaveButton({ saving, saved, valid, ...props }: Props) {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={saving || !valid}
      startIcon={saving ? <CircularProgress size={18} color="inherit" /> : saved ? <CheckIcon /> : undefined}
      sx={{ minWidth: 112 }}
      {...props}
    >
      {saving ? 'Saving…' : saved ? 'Saved' : 'Save'}
    </Button>
  );
}
