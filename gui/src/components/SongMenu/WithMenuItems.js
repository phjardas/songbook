import React from 'react';
import DeleteMenuItem from './DeleteMenuItem';
import EditMenuItem from './EditMenuItem';
import PrintMenuItem from './PrintMenuItem';
import PublishMenuItem from './PublishMenuItem';
import ShareMenuItem from './ShareMenuItem';
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
                <ShareMenuItem {...itemProps}>
                  {ShareItem => (
                    <PublishMenuItem {...itemProps}>
                      {PublishItem => (
                        <UnpublishMenuItem {...itemProps}>
                          {UnpublishItem => (
                            <DeleteMenuItem {...itemProps}>
                              {DeleteItem => {
                                const items = [
                                  EditItem,
                                  TransposeItem,
                                  PrintItem,
                                  ShareItem,
                                  PublishItem,
                                  UnpublishItem,
                                  DeleteItem,
                                ].filter(m => !!m);
                                console.log('items:', items);
                                return items.length ? children({ items }) : null;
                              }}
                            </DeleteMenuItem>
                          )}
                        </UnpublishMenuItem>
                      )}
                    </PublishMenuItem>
                  )}
                </ShareMenuItem>
              )}
            </PrintMenuItem>
          )}
        </EditMenuItem>
      )}
    </TransposeMenuItem>
  );
}
