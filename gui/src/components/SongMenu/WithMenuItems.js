import React from 'react';
import DeleteMenuItem from './DeleteMenuItem';
import EditMenuItem from './EditMenuItem';
import PublishMenuItem from './PublishMenuItem';
import PrintMenuItem from './PrintMenuItem';
import TransposeMenuItem from './TransposeMenuItem';
import UnpublishMenuItem from './UnpublishMenuItem';

export default function WithMenuItems({ children, hide, ...props }) {
  const itemProps = { ...props, hideMenu: hide };

  return (
    <TransposeMenuItem {...itemProps}>
      {TransposeItem => (
        <EditMenuItem {...itemProps}>
          {EditItem => (
            <PrintMenuItem {...itemProps}>
              {PrintItem => (
                <PublishMenuItem {...itemProps}>
                  {PublishItem => (
                    <UnpublishMenuItem {...itemProps}>
                      {UnpublishItem => (
                        <DeleteMenuItem {...itemProps}>
                          {DeleteItem => {
                            const items = [EditItem, TransposeItem, PrintItem, PublishItem, UnpublishItem, DeleteItem].filter(m => !!m);
                            return items.length ? children({ items }) : null;
                          }}
                        </DeleteMenuItem>
                      )}
                    </UnpublishMenuItem>
                  )}
                </PublishMenuItem>
              )}
            </PrintMenuItem>
          )}
        </EditMenuItem>
      )}
    </TransposeMenuItem>
  );
}
