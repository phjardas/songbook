import { Box } from '@mui/material';
import type { LyricsLine } from '../types';
import Chord from './Chord';

const cell = {
  typography: 'body1',
  verticalAlign: 'baseline',
  whiteSpace: 'nowrap',
  lineHeight: 1.2,
  '@media print': { color: 'black' },
};
const chordsCell = { ...cell, p: '0 0.5rem 0 0', fontWeight: 500, color: 'rgba(0, 0, 0, 0.66)' };
const lyricsCell = { ...cell, p: 0 };

export default function SongLyricsLine({ line: { parts }, highlighted }: { line: LyricsLine; highlighted: boolean }) {
  const hasChords = parts.some(({ chord }) => !!chord);
  const hasText = parts.some(({ text }) => !!text);

  return (
    <Box sx={{ mb: 0.5, bgcolor: highlighted ? 'grey.300' : undefined }}>
      <table cellSpacing={0}>
        <tbody>
          {hasChords && (
            <tr>
              {parts.map(({ chord }, i) => (
                <Box component="td" key={i} sx={chord ? chordsCell : undefined}>
                  {chord && <Chord chord={chord} />}
                </Box>
              ))}
            </tr>
          )}
          {hasText && (
            <tr>
              {parts.map(({ text }, i) => (
                <Box component="td" key={i} sx={text ? lyricsCell : undefined}>
                  {text?.trim()}
                  {text?.endsWith(' ') && <>&nbsp;</>}
                </Box>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </Box>
  );
}
