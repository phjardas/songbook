import { IconButton, Tooltip } from '@material-ui/core';
import { Print as PrintIcon } from '@material-ui/icons';
import React from 'react';

export default function PrintMenuItem({ hideMenu, children }) {
  const onClick = () => {
    hideMenu && hideMenu();
    window.print();
  };

  return children(props => (
    <Tooltip title="Print">
      <IconButton {...props} onClick={onClick}>
        <PrintIcon />
      </IconButton>
    </Tooltip>
  ));
}
