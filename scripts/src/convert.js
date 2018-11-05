import fs from 'fs';
import yargs from 'yargs';
import { promisify } from 'util';
import { parseOpenSong } from './opensong/parser';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

yargs.command(
  'convert <FILE>',
  'Convert an OpenSong song to the Songbook format',
  opts =>
    opts
      .option('output', { describe: 'Output file, omit or use `-` for STDOUT', default: '-' })
      .positional('file', { describe: 'Input file to convert', required: true }),
  main
);

async function parseOpenSongFile(filename) {
  const content = await readFile(filename, 'utf8');
  return await parseOpenSong(content);
}

async function main(args) {
  const song = await parseOpenSongFile(args.FILE);

  if (args.output === '-') {
    console.log(JSON.stringify(song, null, 2));
  } else {
    await writeFile(args.output, JSON.stringify(song), 'utf8');
  }
}
