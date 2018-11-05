import React from 'react';
import styled from 'styled-components';
import Pitch from './Pitch';

const ChordSymbol = styled.span`
  font-weight: bold;
`;

export default function Chord({ chord }) {
  if (!chord.trim()) return null;
  const m = chord.match(/^([CDEFGAB][b#]?)(m?)(.*?)(\/.*)?$/);
  if (!m) return <ChordSymbol>{chord}</ChordSymbol>;

  // eslint-disable-next-line
  const [_, pitch, gender, alterations, inversion] = m;

  return (
    <ChordSymbol>
      <Pitch pitch={pitch} />
      {gender}
      {alterations && <sup>{alterations}</sup>}
      {inversion}
    </ChordSymbol>
  );
}
