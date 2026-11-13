import { parseChord } from '../parser/chord';
import Pitch from './Pitch';

function Chord({ chord }: { chord: string }) {
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

export default Chord;
