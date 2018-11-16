import { withStyles } from '@material-ui/core';
import React from 'react';
import SongLyricsLine from './SongLyricsLine';

function translateSectionHeader(header) {
  if (header === 'B') return 'Bridge';
  if (header === 'C') return 'Chorus';
  if (header === 'P') return 'Pre-Chorus';
  if (header.startsWith('V')) return `Verse ${header.substring(1)}`;
  return header;
}

function SongLyricsSection({ section: { header, lines }, classes }) {
  return (
    <div className={classes.section}>
      {header && <div className={classes.header}>{translateSectionHeader(header)}</div>}
      {lines.map(({ chords, lyrics }, i) => (
        <SongLyricsLine key={i} chords={chords} lyrics={lyrics} />
      ))}
    </div>
  );
}

const styles = ({ spacing, typography }) => ({
  section: {
    marginTop: spacing.unit * 3,
  },
  header: {
    ...typography.h5,
  },
});

export default withStyles(styles)(SongLyricsSection);
