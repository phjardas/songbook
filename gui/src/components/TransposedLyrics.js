import { transpose } from 'chord-transposer';

function transposeTo(lyrics, originalKey, transposedKey) {
  if (transposedKey === originalKey) return lyrics;

  const transposer = chord => {
    if (!chord.trim()) return chord;
    return transpose(chord)
      .fromKey(originalKey)
      .toKey(transposedKey)
      .toString();
  };

  return lyrics.map(section => ({
    ...section,
    lines: section.lines.map(line => ({
      ...line,
      chords: line.chords && line.chords.map(transposer),
    })),
  }));
}

export default function SongLyrics({ lyrics, originalKey, actualKey, children }) {
  return children({ lyrics: transposeTo(lyrics, originalKey, actualKey) });
}
