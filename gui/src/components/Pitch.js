export default function Pitch({ pitch }) {
  return renderPitch(pitch);
}

export function renderPitch(pitch) {
  const m = pitch.match(/^([CDEFGAB])([b#]?)$/);
  if (!m) return pitch;

  // eslint-disable-next-line
  const [_, key, accidental] = m;

  return `${key}${renderAccidental(accidental)}`;
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
