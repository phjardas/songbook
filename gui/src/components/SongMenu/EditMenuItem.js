import { IconButton, Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import ButtonLink from '../ButtonLink';

export default function EditMenuItem({ song, hideMenu, children }) {
  if (!song.meta.owned) return children(null);

  return children(props => (
    <Tooltip title="Edit">
      <ButtonLink Component={IconButton} color="primary" to={`${song.meta.url}/edit`} {...props}>
        <EditIcon />
      </ButtonLink>
    </Tooltip>
  ));
}