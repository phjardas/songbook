export default function Pitch({ pitch }: { pitch: string }) {
  const { key, accidental, suffix } = parsePitch(pitch);
  return (
    <>
      {key}
      {accidental && <sup>{renderAccidental(accidental)}</sup>}
      {suffix}
    </>
  );
}

function parsePitch(pitch: string) {
  const m = pitch.match(/^([CDEFGAB])([b#]?)(.*)$/);
  if (!m) return { key: pitch, accidental: '', suffix: '' };

  // eslint-disable-next-line
  const [_, key, accidental, suffix] = m;
  return { key, accidental, suffix };
}

function renderAccidental(accidental: string) {
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
