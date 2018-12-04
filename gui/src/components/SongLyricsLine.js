import { withStyles } from '@material-ui/core';
import React from 'react';
import Chord from './Chord';

function SongLyricsLine({ line: { parts }, className = '', classes }) {
  const hasChords = parts.some(({ chord }) => !!chord);
  const hasText = parts.some(({ text }) => !!text);

  return (
    <div className={`${classes.table} ${className}`}>
      <table cellSpacing={0}>
        <tbody>
          {hasChords && (
            <tr>
              {parts.map(({ chord }, i) =>
                chord ? (
                  <td key={i} className={classes.chordsCell}>
                    <Chord chord={chord} />
                  </td>
                ) : (
                  <td key={i} />
                )
              )}
            </tr>
          )}
          {hasText && (
            <tr>
              {parts.map(({ text }, i) =>
                text ? (
                  <td key={i} className={classes.lyricsCell}>
                    {text.trim()}
                    {text.endsWith(' ') && <>&nbsp;</>}
                  </td>
                ) : (
                  <td key={i} />
                )
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
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
