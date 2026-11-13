import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import NoprintTooltip from './NoprintTooltip';

function PrimaryActions({ items }) {
  return items.map(({ Icon, label, onClick }) => (
    <NoprintTooltip title={label} key={label}>
      <IconButton onClick={onClick} color="inherit" aria-label={label}>
        <Icon />
      </IconButton>
    </NoprintTooltip>
  ));
}

function SecondaryActions({ items }) {
  const [anchor, setAnchor] = useState(null);
  const close = () => setAnchor(null);

  return (
    <>
      <IconButton color="inherit" onClick={e => setAnchor(e.currentTarget)} aria-label="More actions">
        <MoreVertIcon />
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={close} sx={{ '@media print': { display: 'none' } }}>
        {items.map(({ Icon, label, onClick }) => (
          <MenuItem
            key={label}
            onClick={() => {
              close();
              onClick();
            }}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default function MobileSongActions({ items }) {
  if (items.length > 3) {
    return (
      <>
        <PrimaryActions items={items.slice(0, 2)} />
        <SecondaryActions items={items} />
      </>
    );
  }

  return <PrimaryActions items={items} />;
}
