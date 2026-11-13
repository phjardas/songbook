import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { Box, IconButton, SnackbarContent, type SnackbarContentProps } from '@mui/material';
import { amber, green } from '@mui/material/colors';

const variants = {
  success: { Icon: CheckCircleIcon, bgcolor: green[600] },
  warning: { Icon: WarningIcon, bgcolor: amber[700] },
  error: { Icon: ErrorIcon, bgcolor: 'error.dark' },
  info: { Icon: InfoIcon, bgcolor: 'primary.dark' },
};

interface Props extends Omit<SnackbarContentProps, 'message' | 'onClose' | 'variant'> {
  message: string;
  variant: keyof typeof variants;
  onClose?: () => void;
}

export default function CustomSnackbarContent({ message, onClose, variant, sx, ...other }: Props) {
  const { Icon, bgcolor } = variants[variant];

  return (
    <SnackbarContent
      sx={[{ bgcolor }, ...(Array.isArray(sx) ? sx : [sx])]}
      message={
        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon sx={{ fontSize: 20, opacity: 0.9, mr: 1 }} />
          {message}
        </Box>
      }
      action={
        onClose && (
          <IconButton color="inherit" onClick={onClose} aria-label="Close">
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )
      }
      {...other}
    />
  );
}
