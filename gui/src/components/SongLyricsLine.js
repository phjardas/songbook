import { withStyles } from '@material-ui/core';
import React from 'react';
import Chord from './Chord';

function SongLyricsLine({ chords, lyrics, classes }) {
  return (
    <table cellSpacing={0} className={classes.table}>
      <tbody>
        {chords && chords.length && (
          <tr>
            {chords.map((chord, i) => (
              <td key={i} className={classes.chordsCell}>
                <Chord chord={chord} />
              </td>
            ))}
          </tr>
        )}
        {lyrics && lyrics.length && (
          <tr>
            {lyrics.map((lyric, i) => (
              <td key={i} className={classes.lyricsCell}>
                {lyric.trim()}
                {lyric.endsWith(' ') && <>&nbsp;</>}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

const styles = ({ spacing, typography }) => {
  const cell = {
    ...typography.body1,
    verticalAlign: 'baseline',
    whiteSpace: 'nowrap',
    lineHeight: 1.2,
  };

  return {
    table: {
      marginBottom: spacing.unit / 2,
    },
    chordsCell: {
      ...cell,
      padding: '0 0.5rem 0 0',
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.66)',
    },
    lyricsCell: {
      ...cell,
      padding: 0,
    },
  };
};

export default withStyles(styles)(SongLyricsLine);
