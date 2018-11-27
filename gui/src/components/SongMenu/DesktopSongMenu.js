import { IconButton, Tooltip, withStyles } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import React from 'react';
import ButtonLink from '../ButtonLink';
import WithMenuItems from './WithMenuItems';

function DesktopSongMenu({ classes, ...props }) {
  const { song } = props;

  return (
    <div className={classes.root}>
      <Tooltip title={`Back to ${song.meta.draft ? 'drafts' : 'songs'}`}>
        <ButtonLink Component={IconButton} to={song.meta.draft ? '/drafts' : '/songs'}>
          <ArrowBackIcon />
        </ButtonLink>
      </Tooltip>

      <WithMenuItems {...props}>{({ items }) => items.map((Item, i) => <Item key={i} />)}</WithMenuItems>
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
