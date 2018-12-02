import { withStyles } from '@material-ui/core';
import React from 'react';
import SongLyricsLine from './SongLyricsLine';

function SongLyricsSection({ section: { label, lines }, classes }) {
  return (
    <div className={classes.section}>
      {label && <div className={classes.header}>{label}</div>}
      {lines.map((line, i) => (
        <SongLyricsLine key={i} line={line} />
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
