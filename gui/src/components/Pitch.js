import React from 'react';

export default function Pitch({ pitch }) {
  const { key, accidental, suffix } = parsePitch(pitch);
  return (
    <>
      {key}
      {accidental && <sup>{renderAccidental(accidental)}</sup>}
      {suffix}
    </>
  );
}

export function renderPitch(pitch) {
  const { key, accidental, suffix } = parsePitch(pitch);
  return `${key}${renderAccidental(accidental)}${suffix}`;
}

function parsePitch(pitch) {
  const m = pitch.match(/^([CDEFGAB])([b#]?)(.*)$/);
  if (!m) return pitch;

  // eslint-disable-next-line
  const [_, key, accidental, suffix] = m;
  return { key, accidental, suffix };
}

function renderAccidental(accidental) {
  if (!accidental) return '';
  switch (accidental) {
    case '#':
      return '♯';
    case 'b':
      return '♭';
    default:
      return accidental;
  }
}
