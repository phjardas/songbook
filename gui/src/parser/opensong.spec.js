import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import parse from './opensong';

const readFile = promisify(fs.readFile);

async function parseSong(name) {
  const file = path.resolve(__dirname, `opensong.spec.${name}.txt`);
  const content = await readFile(file, 'utf8');
  return parse(content);
}

describe('parser', () => {
  describe('opensong', () => {
    it('should parse a song', async () => {
      const { messages, sections } = await parseSong('song1');

      expect(messages).toEqual([]);
      expect(sections).toHaveLength(5);

      expect(sections[0]).toHaveProperty('type', undefined);
      expect(sections[0]).toHaveProperty('label', undefined);
      expect(sections[0].lines).toEqual([
        [
          { text: 'I ', col: 0 },
          { text: 'looked over Jordan, and ', chord: 'D', col: 2 },
          { text: 'what did I ', chord: 'G', col: 26 },
          { text: 'see,', chord: 'D', col: 37 },
        ],
        [{ text: 'Comin’ for to carry me ', col: 0 }, { text: 'home.', chord: 'A7', col: 23 }],
      ]);

      expect(sections[1]).toHaveProperty('type', 'chorus');
      expect(sections[1]).toHaveProperty('label', 'Chorus');

      expect(sections[2]).toHaveProperty('type', 'verse');
      expect(sections[2]).toHaveProperty('label', 'Verse 2');

      expect(sections[3]).toHaveProperty('type', 'bridge');
      expect(sections[3]).toHaveProperty('label', 'Bridge');
      expect(sections[3].lines).toEqual([
        [{ chord: 'D', col: 0 }, { chord: 'G', col: 2 }, { chord: 'D', col: 4 }],
        [{ chord: 'A7', col: 0 }],
      ]);

      expect(sections[4]).toHaveProperty('type', 'verse');
      expect(sections[4]).toHaveProperty('label', 'Verse 3');
      expect(sections[4].lines).toEqual([
        [{ text: 'I looked over Jordan, and what did I see,', col: 0 }],
        [{ text: 'Comin’ for to carry me home.', col: 0 }],
      ]);
    });
  });
});
