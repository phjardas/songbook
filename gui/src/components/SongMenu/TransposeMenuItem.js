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
              Icon: SwapVertIcon,
              label: 'Transpose',
              onClick,
            })}
          </>
        );
      }}
    </ModalController>
  );
}
