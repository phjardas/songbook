import { withStyles } from '@material-ui/core';
import React from 'react';
import Chord from './Chord';

function SongLyricsLine({ chords, lyrics, classes }) {
  return (
    <table className={classes.table}>
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
                {lyric}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

const styles = ({ spacing, typography }) => ({
  table: {
    marginBottom: spacing.unit,
    lineHeight: 1,
  },
  chordsCell: {
    lineHeight: 1.2,
    padding: '0 0.5rem 0 0',
    verticalAlign: 'baseline',
    ...typography.body1,
  },
  lyricsCell: {
    padding: '0 0.1rem 0 0',
    verticalAlign: 'baseline',
    ...typography.body1,
  },
});

export default withStyles(styles)(SongLyricsLine);
