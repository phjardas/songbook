import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import parse from './chordpro';

const readFile = promisify(fs.readFile);

async function parseSong(name) {
  const file = path.resolve(__dirname, `chordpro.spec.${name}.txt`);
  const content = await readFile(file, 'utf8');
  return parse(content);
}

describe('parser', () => {
  describe('chordpro', () => {
    it('should parse a song', async () => {
      const { messages, sections } = await parseSong('song1');

      expect(messages).toEqual([{ line: 4, type: 'warning', message: 'Ignoring directive "title"' }]);
      expect(sections).toHaveLength(4);

      expect(sections[0]).toHaveProperty('type', undefined);
      expect(sections[0]).toHaveProperty('label', undefined);
      expect(sections[0].lines).toEqual([
        [
          { text: 'I ' },
          { text: 'looked over Jordan, and ', chord: 'D' },
          { text: 'what did I ', chord: 'G' },
          { text: 'see,', chord: 'D' },
        ],
        [{ text: 'Comin’ for to carry me ' }, { text: 'home.', chord: 'A7' }],
      ]);

      expect(sections[1]).toHaveProperty('type', 'chorus');
      expect(sections[1]).toHaveProperty('label', 'Chorus');

      expect(sections[2]).toHaveProperty('type', 'verse');
      expect(sections[2]).toHaveProperty('label', 'Verse 2');

      expect(sections[3]).toHaveProperty('type', undefined);
      expect(sections[3]).toHaveProperty('label', undefined);
    });
  });
});
