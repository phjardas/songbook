import React from 'react';
import SongLyricsSection from './SongLyricsSection';

export default function SongLyrics({ lyrics: { messages, sections }, highlightLine }) {
  return sections.map((section, i) => {
    const applicableMessages = messages
      .filter(msg => msg.line >= section.firstLine && msg.line <= section.lastLine)
      .sort((a, b) => a.line - b.line);
    return <SongLyricsSection key={i} section={section} highlightLine={highlightLine} messages={applicableMessages} />;
  });
}
