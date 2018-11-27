import { IconButton, ListItemIcon, ListItemText, MenuItem, Tooltip } from '@material-ui/core';
import { SwapVert as SwapVertIcon } from '@material-ui/icons';
import React from 'react';
import ModalController from '../ModalController';
import TransposeDialog from './TransposeDialog';

export default function TransposeMenuItem({ song: { key: originalKey }, transposedKey, onKeyChange, hideMenu, children }) {
  if (!originalKey) return children(null);

  return (
    <ModalController>
      {({ show, ...props }) => {
        const onClick = () => {
          show();
          hideMenu && hideMenu();
        };

        return (
          <>
            <TransposeDialog {...props} originalKey={originalKey} transposedKey={transposedKey} onKeyChange={onKeyChange} />
            {children({
              ListItem: props => (
                <MenuItem {...props} onClick={onClick}>
                  <ListItemIcon>
                    <SwapVertIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transpose" />
                </MenuItem>
              ),
              IconButton: props => (
                <Tooltip title="Transpose">
                  <IconButton {...props} onClick={onClick}>
                    <SwapVertIcon />
                  </IconButton>
                </Tooltip>
              ),
            })}
          </>
        );
      }}
    </ModalController>
  );
}
