import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, withStyles } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import NoprintTooltip from './NoprintTooltip';
import WithMenuItems from './WithMenuItems';

function PrimaryActions({ items }) {
  return items.map((item, i) => (
    <NoprintTooltip title={item.label} key={i}>
      <IconButton onClick={item.onClick} color="inherit">
        <item.Icon />
      </IconButton>
    </NoprintTooltip>
  ));
}

function SecondaryActions({ items, classes }) {
  const [anchor, setAnchor] = useState();
  const open = !!anchor;
  const toggle = e => setAnchor(open ? null : e.currentTarget);
  const close = () => setAnchor(null);

  return (
    <>
      <IconButton color="inherit" onClick={toggle}>
        <MoreVertIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchor} onClose={close} className={classes.menu}>
        {items.map((item, i) => (
          <MenuItem key={i} onClick={item.onClick}>
            <ListItemIcon>
              <item.Icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function MobileSongActions({ classes, ...props }) {
  return (
    <WithMenuItems {...props}>
      {({ items }) => {
        if (items.length > 3) {
          const primaryItems = items.slice(0, 2);

          return (
            <>
              <PrimaryActions items={primaryItems} />
              <SecondaryActions items={items} classes={classes} />
            </>
          );
        }

        return <PrimaryActions items={items} />;
      }}
    </WithMenuItems>
  );
}

const styles = {
  menu: {
    '@media print': {
      display: 'none',
    },
  },
};

export default withStyles(styles)(MobileSongActions);
