import fs from 'fs';
import yargs from 'yargs';
import { promisify } from 'util';
import { parseOpenSong } from './opensong/parser';

const readFile = promisify(fs.readFile);

yargs.command('import <FILE...>', 'Import files into Firestore', () => {}, main);

async function parseOpenSongFile(filename) {
  const content = await readFile(filename, 'utf8');
  return await parseOpenSong(content);
}

async function main(args) {
  console.log(args);
}
