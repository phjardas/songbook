import { Box } from '@mui/material';
import type { LyricsLine } from '../types';
import Chord from './Chord';

const cell = {
  verticalAlign: 'baseline',
  whiteSpace: 'nowrap',
  p: 0,
};

// Chords use a condensed, heavier cut of the same face in the tertiary (amber) color,
// so they read as a separate voice above the lyrics without a second typeface.
const chordsCell = {
  ...cell,
  pr: '0.6em',
  fontSize: '0.95rem',
  lineHeight: 1.4,
  fontWeight: 650,
  fontVariationSettings: '"wdth" 75',
  color: 'm3.tertiary',
  '@media print': { color: '#000' },
};

const lyricsCell = {
  ...cell,
  fontSize: '1.125rem',
  lineHeight: 1.45,
  '@media print': { color: '#000' },
};

export default function SongLyricsLine({ line: { parts }, highlighted }: { line: LyricsLine; highlighted: boolean }) {
  const hasChords = parts.some(({ chord }) => !!chord);
  const hasText = parts.some(({ text }) => !!text);

  return (
    <Box
      sx={{
        mb: 0.75,
        mx: -1,
        px: 1,
        borderRadius: '4px',
        bgcolor: highlighted ? 'm3.secondaryContainer' : undefined,
        transition: 'background-color 150ms',
      }}
    >
      <table cellSpacing={0} style={{ borderCollapse: 'collapse' }}>
        <tbody>
          {hasChords && (
            <tr>
              {parts.map(({ chord }, i) => (
                <Box component="td" key={i} sx={chordsCell}>
                  {chord && <Chord chord={chord} />}
                </Box>
              ))}
            </tr>
          )}
          {hasText && (
            <tr>
              {parts.map(({ text }, i) => (
                <Box component="td" key={i} sx={lyricsCell}>
                  {/* Collapse runs of spaces, but keep one at either end: chord boundaries can fall between words. */}
                  {text?.startsWith(' ') && <>&nbsp;</>}
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
