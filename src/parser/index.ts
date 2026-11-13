import chordpro from './chordpro';
import opensong from './opensong';
import type { LyricsType, ParsedLyrics } from '../types';

const parsers = { chordpro, opensong };

export default function parseLyrics({ type, lyrics }: { type: LyricsType; lyrics: string }): ParsedLyrics {
  if (!(type in parsers)) throw new Error(`Can not parse lyrics of type "${type}"`);
  return parsers[type](lyrics);
}
