import { CircularProgress } from '@material-ui/core';
import { CloudOff as UnpublishIcon } from '@material-ui/icons';
import React, { useState } from 'react';

export default function UnpublishMenuItem({ song, unpublishSong, hideMenu, children }) {
  if (!song.meta.owned || song.meta.draft) return children(null);

  const [pending, setPending] = useState(false);
  const onClick = async () => {
    try {
      setPending(true);
      await unpublishSong();
      hideMenu && hideMenu();
    } finally {
      setPending(false);
    }
  };

  return children({
    Icon: props => (pending ? <CircularProgress color="secondary" size="1em" {...props} /> : <UnpublishIcon {...props} />),
    label: 'Unpublish',
    onClick,
  });
}
