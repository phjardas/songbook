import { IconButton, Menu, withStyles } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import WithMenuItems from './WithMenuItems';

function MobileSongMenu({ classes, ...props }) {
  const [anchor, setAnchor] = useState();
  const toggle = e => setAnchor(anchor ? null : e.currentTarget);
  const hide = () => setAnchor(null);

  return (
    <WithMenuItems {...props} hideMenu={hide}>
      {({ items }) => (
        <div className={classes.root}>
          <IconButton onClick={toggle}>
            <MoreVertIcon />
          </IconButton>
          <Menu open={!!anchor} anchorEl={anchor} onClose={toggle}>
            {items.map((item, i) => (
              <item.ListItem key={i} />
            ))}
          </Menu>
        </div>
      )}
    </WithMenuItems>
  );
}

const styles = ({ spacing }) => ({
  root: {
    float: 'right',
    margin: spacing.unit * 2,
    '@media print': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(MobileSongMenu);
