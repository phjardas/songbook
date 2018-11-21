import React from 'react';
import SongLyricsSection from './SongLyricsSection';

export default function SongLyrics({ lyrics }) {
  return lyrics.map((section, i) => <SongLyricsSection key={i} section={section} />);
}
