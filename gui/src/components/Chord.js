import React from 'react';
import styled from 'styled-components';

const ChordSymbol = styled.span`
  font-weight: bold;
`;

export default function Chord({ chord }) {
  if (!chord.trim()) return null;
  const m = chord.match(/^([CDEFGAB])([b#]?)(m?)(.*?)(\/.*)?$/);
  if (!m) return <ChordSymbol>{chord}</ChordSymbol>;

  // eslint-disable-next-line
  const [_, pitch, accidental, gender, alterations, inversion] = m;

  return (
    <ChordSymbol>
      {pitch}
      {accidental && <sup>{renderAccidental(accidental)}</sup>}
      {gender}
      {alterations && <sup>{alterations}</sup>}
      {inversion}
    </ChordSymbol>
  );
}

function renderAccidental(accidental) {
  switch (accidental) {
    case '#':
      return '♯';
    case 'b':
      return '♭';
    default:
      return accidental;
  }
}
