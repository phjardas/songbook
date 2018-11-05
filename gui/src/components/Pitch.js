import React from 'react';

export default function Pitch({ pitch }) {
  const m = pitch.match(/^([CDEFGAB])([b#]?)$/);
  if (!m) return pitch;

  // eslint-disable-next-line
  const [_, key, accidental] = m;

  return (
    <>
      {key}
      {accidental && <sup>{renderAccidental(accidental)}</sup>}
    </>
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
