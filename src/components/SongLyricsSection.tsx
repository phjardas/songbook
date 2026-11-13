import { Box } from '@mui/material';
import type { LyricsMessage, LyricsSection } from '../types';
import SongLyricsLine from './SongLyricsLine';

interface Props {
  section: LyricsSection;
  messages: LyricsMessage[];
  highlightLine?: number;
}

export default function SongLyricsSection({ section: { label, lines }, highlightLine }: Props) {
  // TODO render messages
  return (
    <Box sx={{ mt: 3 }}>
      {label && <Box sx={{ typography: 'h5', '@media print': { color: 'black' } }}>{label}</Box>}
      {lines.map((line, i) => (
        <SongLyricsLine key={i} line={line} highlighted={highlightLine !== undefined && !!line.lines?.includes(highlightLine)} />
      ))}
    </Box>
  );
}
