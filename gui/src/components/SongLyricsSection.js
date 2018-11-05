import React from 'react';
import SongLyricsLine from './SongLyricsLine';
import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: 1rem;
`;

function translateSectionHeader(header) {
  if (header === 'B') return 'Bridge';
  if (header === 'C') return 'Chorus';
  if (header === 'P') return 'Pre-Chorus';
  if (header.startsWith('V')) return `Verse ${header.substring(1)}`;
  return header;
}

function SongLyricsSectionHeader({ header }) {
  return <h3>{translateSectionHeader(header)}</h3>;
}

export default function SongLyricsSection({ section: { header, lines } }) {
  return (
    <Section>
      {header && <SongLyricsSectionHeader header={header} />}
      {lines.map(({ chords, lyrics }, i) => (
        <SongLyricsLine key={i} chords={chords} lyrics={lyrics} />
      ))}
    </Section>
  );
}
