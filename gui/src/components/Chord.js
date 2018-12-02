import React from 'react';
import Pitch from './Pitch';

function Chord({ chord }) {
  if (!chord.trim()) return null;
  const { pitch, gender, alterations, inversion } = parseChord(chord);

  return (
    <>
      <Pitch pitch={pitch} />
      {gender}
      {alterations && <sup>{alterations}</sup>}
      {inversion}
    </>
  );
}

export function parseChord(chord) {
  const m = chord.trim().match(/^([CDEFGAB][b#]?)([m-]?)(.*?)(\/.*)?$/);

  if (!m) {
    return { pitch: chord };
  }

  // eslint-disable-next-line
  let [_, pitch, gender, alterations, inversion] = m;

  // fix parsing of maj7 chords that are wrongly classified as minor
  if (gender === 'm' && alterations.startsWith('aj')) {
    gender = '';
    alterations = `m${alterations}`;
  }

  return {
    pitch,
    gender: gender || undefined,
    alterations: alterations || undefined,
    inversion: inversion || undefined,
  };
}

export default Chord;
