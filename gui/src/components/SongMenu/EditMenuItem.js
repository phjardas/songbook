import { IconButton, ListItemIcon, ListItemText, MenuItem, Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import ButtonLink from '../ButtonLink';

export default function EditMenuItem({ song, hideMenu, children }) {
  if (!song.meta.owned) return children(null);

  return children({
    ListItem: props => (
      <ButtonLink Component={MenuItem} button to={`${song.meta.url}/edit`} {...props} onClick={hideMenu}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </ButtonLink>
    ),
    IconButton: props => (
      <Tooltip title="Edit">
        <ButtonLink Component={IconButton} color="primary" to={`${song.meta.url}/edit`} {...props}>
          <EditIcon />
        </ButtonLink>
      </Tooltip>
    ),
  });
}
