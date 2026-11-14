import { Box, Grid, TextField } from '@mui/material';
import { type SyntheticEvent, useState } from 'react';
import parseLyrics from '../parser';
import type { LyricsType } from '../types';
import SongLyrics from './SongLyrics';

interface Props {
  lyrics: string;
  lyricsType: LyricsType;
  onChange: (lyrics: string) => void;
  disabled?: boolean;
}

export default function LyricsEditor({ lyrics, lyricsType, onChange, ...props }: Props) {
  const [caretLine, setCaretLine] = useState(0);

  const updateCaretPosition = (e: SyntheticEvent<HTMLElement>) => {
    const index = (e.target as HTMLTextAreaElement).selectionStart;
    setCaretLine(lyrics.substring(0, index).split(/\r?\n/).length - 1);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <TextField
          id="lyrics"
          label={lyricsType === 'chordpro' ? 'Lyrics (ChordPro)' : 'Lyrics (OpenSong)'}
          value={lyrics}
          multiline
          minRows={12}
          required
          onChange={e => onChange(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              sx: { fontFamily: '"Roboto Mono", ui-monospace, monospace', fontSize: '0.875rem', lineHeight: 1.6 },
              onKeyUp: updateCaretPosition,
              onClick: updateCaretPosition,
              onFocus: updateCaretPosition,
            },
          }}
          {...props}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Box
          aria-label="Preview"
          sx={{ bgcolor: 'm3.surfaceContainerLow', borderRadius: '16px', px: 3, pb: 3, pt: 0.5, minHeight: '100%' }}
        >
          <SongLyrics lyrics={parseLyrics({ type: lyricsType, lyrics })} highlightLine={caretLine} />
        </Box>
      </Grid>
    </Grid>
  );
}
