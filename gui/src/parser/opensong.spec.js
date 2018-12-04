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
      const song = await parseSong('song1');
      expect(song).toMatchSnapshot();
    });
  });
});
