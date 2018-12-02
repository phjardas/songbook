import { IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import ButtonLink from '../ButtonLink';
import NoprintTooltip from './NoprintTooltip';

export default function EditMenuItem({ song, children }) {
  if (!song.meta.owned) return children(null);

  return children(props => (
    <NoprintTooltip title="Edit">
      <ButtonLink Component={IconButton} color="primary" to={`${song.meta.url}/edit`} {...props}>
        <EditIcon />
      </ButtonLink>
    </NoprintTooltip>
  ));
}
