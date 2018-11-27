import { IconButton, Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import ModalController from '../ModalController';
import DeleteDialog from './DeleteDialog';

export default function DeleteMenuItem({ song, doc, hideMenu, children }) {
  if (!song.meta.owned) return children(null);

  return (
    <ModalController>
      {({ show, ...props }) => {
        const onClick = () => {
          show();
          hideMenu && hideMenu();
        };

        return (
          <>
            <DeleteDialog {...props} song={song} doc={doc} />
            {children(props => (
              <Tooltip title="Delete">
                <IconButton {...props} onClick={onClick}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ))}
          </>
        );
      }}
    </ModalController>
  );
}
