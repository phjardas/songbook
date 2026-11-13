import SongLyricsSection from './SongLyricsSection';

import type { ParsedLyrics } from '../types';

export default function SongLyrics({ lyrics: { messages, sections }, highlightLine }: { lyrics: ParsedLyrics; highlightLine?: number }) {
  return sections.map((section, i) => {
    const applicableMessages = messages
      .filter(msg => msg.line >= (section.firstLine ?? 0) && msg.line <= (section.lastLine ?? Infinity))
      .sort((a, b) => a.line - b.line);
    return <SongLyricsSection key={i} section={section} highlightLine={highlightLine} messages={applicableMessages} />;
  });
}
