import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import { CloudUpload as PublishIcon } from '@material-ui/icons';
import React, { useState } from 'react';

export default function PublishMenuItem({ song, publishSong, hideMenu, children }) {
  if (!song.meta.owned || !song.meta.draft) return children(null);

  const [pending, setPending] = useState(false);

  const onClick = async () => {
    try {
      setPending(true);
      await publishSong();
      hideMenu && hideMenu();
    } finally {
      setPending(false);
    }
  };

  return children(props => (
    <Tooltip title="Publish">
      <IconButton {...props} onClick={onClick}>
        {pending ? <CircularProgress color="secondary" size="1em" /> : <PublishIcon />}
      </IconButton>
    </Tooltip>
  ));
}
