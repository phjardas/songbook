import { withStyles } from '@material-ui/core';
import React from 'react';
import SongLyricsLine from './SongLyricsLine';

function SongLyricsLines({ messages, lines, highlightLine, classes }) {
  // TODO render messages
  return lines.map((line, i) => {
    const highlighted = line.lines && line.lines.indexOf(highlightLine) >= 0;
    return <SongLyricsLine key={i} line={line} className={highlighted ? classes.highlight : ''} />;
  });
}

function SongLyricsSection({ messages, section: { label, lines }, highlightLine, classes }) {
  return (
    <div className={classes.section}>
      {label && <div className={classes.header}>{label}</div>}
      <SongLyricsLines messages={messages} lines={lines} highlightLine={highlightLine} classes={classes} />
    </div>
  );
}

const styles = ({ palette, spacing, typography }) => ({
  section: {
    marginTop: spacing.unit * 3,
  },
  header: {
    ...typography.h5,
    '@media print': {
      color: 'black',
    },
  },
  highlight: {
    background: palette.grey[300],
  },
});

export default withStyles(styles)(SongLyricsSection);
