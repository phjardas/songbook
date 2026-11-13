import { Grid, TextField, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import SongLyrics from '../components/SongLyrics';
import parseLyrics from '../parser';

function LyricsPreview({ type, lyrics, ...props }) {
  const parsed = parseLyrics({ type, lyrics });
  return <SongLyrics lyrics={parsed} {...props} />;
}

function LyricsEditor({ lyrics, lyricsType, onChange, classes, className, ...props }) {
  const [caretLine, setCaretLine] = useState(0);

  const updateCaretPosition = e => {
    const index = e.currentTarget.selectionStart;
    const line = lyrics.substring(0, index).split(/\r?\n/).length - 1;
    setCaretLine(line);
  };

  return (
    <Grid container spacing={24} className={className}>
      <Grid item xs={12} lg={6}>
        <TextField
          id="lyrics"
          value={lyrics}
          multiline
          rowsMax={100}
          required
          onChange={e => onChange(e.currentTarget.value)}
          fullWidth
          InputProps={{
            className: classes.lyricsInput,
            onKeyUp: updateCaretPosition,
            onFocus: updateCaretPosition,
          }}
          {...props}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <LyricsPreview lyrics={lyrics} type={lyricsType} highlightLine={caretLine} />
      </Grid>
    </Grid>
  );
}

const styles = {
  lyricsInput: {
    fontFamily: 'monospace',
  },
};

export default withStyles(styles)(LyricsEditor);
