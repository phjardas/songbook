import { IconButton, Menu } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import DeleteMenuItem from './DeleteMenuItem';
import ShareMenuItem from './ShareMenuItem';
import TransposeMenuItem from './TransposeMenuItem';

function SongMenu({ items, anchor, toggle, className }) {
  return (
    <div className={className}>
      <IconButton onClick={toggle}>
        <MoreVertIcon />
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={toggle}>
        {items.map((Item, i) => (
          <Item key={i} />
        ))}
      </Menu>
    </div>
  );
}

export default function SongMenuWrapper({ song, transposedKey, onKeyChange, ...props }) {
  const [anchor, setAnchor] = useState();
  const toggle = e => setAnchor(anchor ? null : e.currentTarget);
  const hide = e => setAnchor(null);

  return (
    <TransposeMenuItem song={song} transposedKey={transposedKey} onKeyChange={onKeyChange} hideMenu={hide}>
      {TransposeItem => (
        <ShareMenuItem song={song} hideMenu={hide}>
          {ShareItem => (
            <DeleteMenuItem song={song} hideMenu={hide}>
              {DeleteItem => {
                const items = [TransposeItem, ShareItem, DeleteItem].filter(m => !!m);
                return items.length ? <SongMenu {...props} items={items} anchor={anchor} toggle={toggle} /> : null;
              }}
            </DeleteMenuItem>
          )}
        </ShareMenuItem>
      )}
    </TransposeMenuItem>
  );
}
