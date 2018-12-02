import React from 'react';
import Pitch from './Pitch';

function Chord({ chord }) {
  if (!chord.trim()) return null;
  const m = chord.trim().match(/^([CDEFGAB][b#]?)(m?)(.*?)(\/.*)?$/);

  if (!m) {
    return <Pitch pitch={chord} />;
  }

  // eslint-disable-next-line
  const [_, pitch, gender, alterations, inversion] = m;
  console.log({ chord, pitch, gender, alterations, inversion });

  return (
    <>
      <Pitch pitch={pitch} />
      {gender}
      {alterations && <sup>{alterations}</sup>}
      {inversion}
    </>
  );
}

export default Chord;
