import { transpose } from 'chord-transposer';
import type { ParsedLyrics } from '../types';

export function transposeLyrics(lyrics: ParsedLyrics, originalKey: string, transposedKey: string): ParsedLyrics {
  if (transposedKey === originalKey) return lyrics;

  const transposer = (chord: string) => {
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
      lines: section.lines.map(line => ({
        ...line,
        parts: line.parts.map(part => ({
          ...part,
          chord: part.chord && transposer(part.chord),
        })),
      })),
    })),
  };
}

