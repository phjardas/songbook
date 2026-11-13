import { describe, expect, it } from 'vitest';
import fs from 'fs';
import { promisify } from 'util';
import parse from './opensong';

const readFile = promisify(fs.readFile);

async function parseSong(name) {
  const file = new URL(`./opensong.spec.${name}.txt`, import.meta.url);
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
