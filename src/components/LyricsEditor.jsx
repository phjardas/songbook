import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import parseLyrics from '../parser';
import SongLyrics from './SongLyrics';

export default function LyricsEditor({ lyrics, lyricsType, onChange, ...props }) {
  const [caretLine, setCaretLine] = useState(0);

  const updateCaretPosition = e => {
    const index = e.target.selectionStart;
    setCaretLine(lyrics.substring(0, index).split(/\r?\n/).length - 1);
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <TextField
          id="lyrics"
          value={lyrics}
          multiline
          maxRows={100}
          required
          onChange={e => onChange(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              sx: { fontFamily: 'monospace' },
              onKeyUp: updateCaretPosition,
              onFocus: updateCaretPosition,
            },
          }}
          {...props}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <SongLyrics lyrics={parseLyrics({ type: lyricsType, lyrics })} highlightLine={caretLine} />
      </Grid>
    </Grid>
  );
}
