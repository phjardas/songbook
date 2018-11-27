import { Hidden } from '@material-ui/core';
import React from 'react';
import DesktopSongMenu from './DesktopSongMenu';
import MobileSongMenu from './MobileSongMenu';

export default function SongMenuWrapper(props) {
  return (
    <>
      <Hidden mdUp>
        <MobileSongMenu {...props} />
      </Hidden>
      <Hidden smDown>
        <DesktopSongMenu {...props} />
      </Hidden>
    </>
  );
}
