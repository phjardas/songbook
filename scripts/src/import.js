import fs from 'fs';
import yargs from 'yargs';
import { promisify } from 'util';
import { firestore } from './firebase';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

yargs.command('import <FILE...>', 'Import files into Firestore', () => {}, main);

async function importSong(file, songs) {
  const data = await readFile(file, 'utf8');
  const song = JSON.parse(data);

  const existing = songs.find(s => s.title === song.title && s.author === song.author);

  if (existing) {
    const ref = firestore.collection('songs').doc(existing.id);
    await ref.update(song);
    console.info('Updated song %s from %s', ref.id, file);
  } else {
    const ref = firestore.collection('songs').doc();
    await ref.set(song);
    console.info('Created song %s from %s', ref.id, file);
  }
}

async function main(args) {
  const songDocs = await firestore.collection('songs').get();
  const songs = songDocs.docs.map(song => ({ ...song.data(), id: song.id }));
  await Promise.all(args.FILE.map(file => importSong(file, songs)));
}
