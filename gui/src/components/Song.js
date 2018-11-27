import { Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PageQR from '../components/PageQR';
import SongLyrics from '../components/SongLyrics';
import SongMenu from '../components/SongMenu';
import TransposedLyrics from '../components/TransposedLyrics';
import UserChip from '../components/UserChip';
import { parseLyrics } from '../opensong';

function Song({ song, classes }) {
  const [transposedKey, setTransposedKey] = useState(song.key);

  return (
    <div className={classes.main}>
      <PageQR />

      <SongMenu song={song} className={classes.menu} transposedKey={transposedKey} onKeyChange={setTransposedKey} />

      <Typography variant="h4" component="h1">
        {song.title}
      </Typography>
      <Typography variant="subtitle1">by {song.author}</Typography>

      {!song.owned && (
        <Typography variant="body2" component="div" className={classes.screenOnly}>
          Shared by <UserChip id={song.owner} />
        </Typography>
      )}

      <TransposedLyrics lyrics={parseLyrics(song.lyrics)} originalKey={song.key} actualKey={transposedKey}>
        {({ lyrics }) => <SongLyrics lyrics={lyrics} />}
      </TransposedLyrics>
    </div>
  );
}

const styles = ({ spacing }) => ({
  main: {
    padding: spacing.unit * 3,
  },
  menu: {
    float: 'right',
    '@media print': {
      display: 'none',
    },
  },
  screenOnly: {
    '@media print': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(Song);
