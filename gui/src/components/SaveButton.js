import { Button, CircularProgress, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Check as CheckIcon, Save as SaveIcon } from '@material-ui/icons';
import React from 'react';

const defaultTitles = {
  save: 'Save',
  saving: 'Saving…',
  saved: 'Saved!',
};

const defaultIcons = {
  save: SaveIcon,
  saving: props => <CircularProgress size={24} color="inherit" {...props} />,
  saved: CheckIcon,
};

function SaveButton({ saving, saved, valid, classes, titles, icons, color = 'primary', variant = 'contained', ...props }) {
  titles = { ...defaultTitles, ...titles };
  const Icons = { ...defaultIcons, ...icons };

  if (saving) {
    return (
      <Button variant={variant} color={color} disabled={true} className={classes.button} {...props}>
        <Icons.saving className={classes.icon} />
        {titles.saving}
      </Button>
    );
  }

  if (saved) {
    return (
      <Button type="submit" variant={variant} className={`${classes.button} ${classes.success}`} {...props}>
        <Icons.saved className={classes.icon} />
        {titles.saved}
      </Button>
    );
  }

  return (
    <Button type="submit" variant={variant} color={color} disabled={!valid} className={classes.button} {...props}>
      <Icons.save className={classes.icon} />
      {titles.save}
    </Button>
  );
}

const styles = ({ spacing }) => ({
  icon: {
    marginRight: spacing.unit,
  },
  button: {
    transition: ['color linear 300ms', 'background-color linear 300ms'],
  },
  success: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
});

export default withStyles(styles)(SaveButton);
