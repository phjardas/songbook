import { withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PageQR from '../components/PageQR';
import SongLyrics from '../components/SongLyrics';
import SongMenu from '../components/SongMenu';
import TransposedLyrics from '../components/TransposedLyrics';
import UserChip from '../components/UserChip';
import { parseLyrics } from '../opensong';

function Song({ classes, ...props }) {
  const { song } = props;
  const [transposedKey, setTransposedKey] = useState(song.key);

  return (
    <>
      <PageQR />
      <SongMenu {...props} transposedKey={transposedKey} onKeyChange={setTransposedKey} />

      <div className={classes.main}>
        <h1 className={classes.title}>{song.title || <em>No Title</em>}</h1>
        <div className={classes.author}>by {song.author || <em>No author</em>}</div>

        {!song.meta.draft && (
          <div className={classes.owner}>
            Transcribed by <UserChip id={song.owner} />
          </div>
        )}

        <TransposedLyrics lyrics={parseLyrics(song.lyrics)} originalKey={song.key} actualKey={transposedKey}>
          {({ lyrics }) => <SongLyrics lyrics={lyrics} />}
        </TransposedLyrics>
      </div>
    </>
  );
}

const styles = ({ spacing, typography }) => ({
  main: {
    padding: spacing.unit * 3,
  },
  title: {
    ...typography.h4,
    margin: 0,
  },
  author: {
    ...typography.subtitle1,
  },
  owner: {
    ...typography.body2,
    '@media print': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(Song);
