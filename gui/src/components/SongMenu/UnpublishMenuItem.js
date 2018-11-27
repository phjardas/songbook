import { CircularProgress, IconButton, ListItemIcon, ListItemText, MenuItem, Tooltip } from '@material-ui/core';
import { CloudOff as UnpublishIcon } from '@material-ui/icons';
import React, { useState } from 'react';

export default function UnpublishMenuItem({ song, unpublishSong, hideMenu, children }) {
  if (!song.meta.owned || song.meta.draft) return children(null);

  const [pending, setPending] = useState(false);

  const onClick = async () => {
    try {
      setPending(true);
      await unpublishSong();
      hideMenu && hideMenu();
    } finally {
      setPending(false);
    }
  };

  return children({
    ListItem: props => (
      <MenuItem button {...props} onClick={onClick}>
        <ListItemIcon>{pending ? <CircularProgress size="1em" /> : <UnpublishIcon />}</ListItemIcon>
        <ListItemText primary="Unpublish" />
      </MenuItem>
    ),
    IconButton: props => (
      <Tooltip title="Unpublish">
        <IconButton {...props} onClick={onClick}>
          {pending ? <CircularProgress size="1em" /> : <UnpublishIcon />}
        </IconButton>
      </Tooltip>
    ),
  });
}
