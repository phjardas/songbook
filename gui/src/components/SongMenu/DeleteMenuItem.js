import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import ModalController from '../ModalController';
import DeleteDialog from './DeleteDialog';

export default function DeleteMenuItem({ song, hideMenu, children }) {
  if (!song.owned) return children(null);

  return (
    <ModalController>
      {({ show, ...props }) => {
        const onClick = () => {
          show();
          hideMenu();
        };

        return (
          <>
            <DeleteDialog {...props} song={song} />
            {children(props => (
              <MenuItem {...props} onClick={onClick}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
            ))}
          </>
        );
      }}
    </ModalController>
  );
}
