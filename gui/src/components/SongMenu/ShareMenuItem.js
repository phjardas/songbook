import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import { Share as ShareIcon } from '@material-ui/icons';
import React from 'react';
import ModalController from '../ModalController';
import ShareDialog from './ShareDialog';

export default function ShareMenuItem({ song, hideMenu, children }) {
  if (!song.isOwner) return children(null);

  return (
    <ModalController>
      {({ show, ...props }) => {
        const onClick = () => {
          show();
          hideMenu();
        };

        return (
          <>
            <ShareDialog {...props} song={song} />
            {children(props => (
              <MenuItem {...props} onClick={onClick}>
                <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon>
                <ListItemText primary="Share" />
              </MenuItem>
            ))}
          </>
        );
      }}
    </ModalController>
  );
}
