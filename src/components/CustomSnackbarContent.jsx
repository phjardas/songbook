import { IconButton, SnackbarContent } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors/';
import { withStyles } from '@material-ui/core/styles';
import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from '@material-ui/icons';
import * as React from 'react';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = ({ spacing, palette }) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: palette.error.dark,
  },
  info: {
    backgroundColor: palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function CustomSnackbarContent({ classes, message, onClose, variant, ...other }) {
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classes[variant]}
      message={
        <span className={classes.message}>
          <Icon className={`${classes.icon} ${classes.iconVariant}`} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default withStyles(styles)(CustomSnackbarContent);
