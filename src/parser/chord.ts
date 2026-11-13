export function parseChord(chord: string) {
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
