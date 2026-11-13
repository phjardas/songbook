import { Check as CheckIcon, Save as SaveIcon } from '@mui/icons-material';
import { Button, type ButtonProps, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

const buttonSx = { transition: 'color linear 300ms, background-color linear 300ms' };
const successSx = { ...buttonSx, color: 'white', bgcolor: green[500], '&:hover': { bgcolor: green[700] } };

interface Props extends ButtonProps {
  saving?: boolean;
  saved?: boolean;
  valid: boolean;
}

export default function SaveButton({ saving, saved, valid, color = 'primary', variant = 'contained', ...props }: Props) {
  if (saving) {
    return (
      <Button variant={variant} color={color} disabled sx={buttonSx} startIcon={<CircularProgress size={24} color="inherit" />} {...props}>
        Saving…
      </Button>
    );
  }

  if (saved) {
    return (
      <Button type="submit" variant={variant} sx={successSx} startIcon={<CheckIcon />} {...props}>
        Saved!
      </Button>
    );
  }

  return (
    <Button type="submit" variant={variant} color={color} disabled={!valid} sx={buttonSx} startIcon={<SaveIcon />} {...props}>
      Save
    </Button>
  );
}
