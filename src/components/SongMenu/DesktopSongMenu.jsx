import { IconButton, withStyles } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import React from 'react';
import ButtonLink from '../ButtonLink';
import NoprintTooltip from './NoprintTooltip';
import WithMenuItems from './WithMenuItems';

function Action({ Icon, label, onClick }) {
  return (
    <NoprintTooltip title={label}>
      <IconButton onClick={onClick} color="inherit">
        <Icon />
      </IconButton>
    </NoprintTooltip>
  );
}

function DesktopSongMenu({ classes, ...props }) {
  const { song } = props;

  return (
    <div className={classes.root}>
      <NoprintTooltip title={`Back to ${song.meta.draft ? 'drafts' : 'songs'}`}>
        <ButtonLink color="inherit" Component={IconButton} to={song.meta.draft ? '/drafts' : '/songs'}>
          <ArrowBackIcon />
        </ButtonLink>
      </NoprintTooltip>

      <WithMenuItems {...props}>{({ items }) => items.map((item, i) => <Action {...item} key={i} />)}</WithMenuItems>
    </div>
  );
}

const styles = ({ spacing }) => ({
  root: {
    marginLeft: spacing.unit,
    display: 'flex',
    '@media print': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(DesktopSongMenu);
