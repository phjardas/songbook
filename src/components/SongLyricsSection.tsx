import { Box } from '@mui/material';
import type { LyricsMessage, LyricsSection } from '../types';
import SongLyricsLine from './SongLyricsLine';

interface Props {
  section: LyricsSection;
  messages: LyricsMessage[];
  highlightLine?: number;
}

export default function SongLyricsSection({ section: { type, label, lines }, highlightLine }: Props) {
  // TODO render messages
  // The chorus is indented behind a bar, as in printed songbooks, so it stands out when it repeats.
  const chorus = type === 'chorus';

  return (
    <Box
      component="section"
      sx={{
        mt: 3,
        breakInside: 'avoid',
        ...(chorus && { pl: 2, borderLeft: 4, borderColor: 'm3.primaryContainer', '@media print': { borderColor: '#000' } }),
      }}
    >
      {label && (
        <Box component="h3" sx={{ typography: 'subtitle2', color: 'm3.primary', m: 0, mb: 0.5, '@media print': { color: '#000' } }}>
          {label}
        </Box>
      )}
      {lines.map((line, i) => (
        <SongLyricsLine key={i} line={line} highlighted={highlightLine !== undefined && !!line.lines?.includes(highlightLine)} />
      ))}
    </Box>
  );
}
