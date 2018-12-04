import { transpose } from 'chord-transposer';

function transposeTo(lyrics, originalKey, transposedKey) {
  if (transposedKey === originalKey) return lyrics;

  const transposer = chord => {
    try {
      if (!chord.trim()) return chord;
      return transpose(chord)
        .fromKey(originalKey)
        .toKey(transposedKey)
        .toString();
    } catch (error) {
      console.error('Error transposing chord "%s" from key "%s" to "%s":', chord, originalKey, transposedKey, error);
    }
  };

  return {
    ...lyrics,
    sections: lyrics.sections.map(section => ({
      ...section,
      lines: section.lines.map(line => line.map(part => ({ ...part, chord: part.chord && transposer(part.chord) }))),
    })),
  };
}

export default function TransposedLyrics({ lyrics, originalKey, actualKey, children }) {
  return children({ lyrics: transposeTo(lyrics, originalKey, actualKey) });
}
