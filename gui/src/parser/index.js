import chordpro from './chordpro';
import opensong from './opensong';

const parsers = { chordpro, opensong };

export default function parseLyrics({ type, lyrics }) {
  if (!(type in parsers)) throw new Error(`Can not parse lyrics of type "${type}"`);
  return parsers[type](lyrics);
}
