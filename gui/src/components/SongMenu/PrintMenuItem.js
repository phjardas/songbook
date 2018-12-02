import { IconButton } from '@material-ui/core';
import { Print as PrintIcon } from '@material-ui/icons';
import React from 'react';
import NoprintTooltip from './NoprintTooltip';

export default function PrintMenuItem({ hideMenu, children }) {
  const onClick = () => {
    hideMenu && hideMenu();
    window.print();
  };

  return children(props => (
    <NoprintTooltip title="Print">
      <IconButton {...props} onClick={onClick}>
        <PrintIcon />
      </IconButton>
    </NoprintTooltip>
  ));
}
