import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const songsDir = path.resolve(__dirname, '../../songs');

async function loadSong(f) {
  const fullFile = path.resolve(songsDir, f);
  const data = await readFile(fullFile, 'utf8');
  const song = JSON.parse(data);
  return {
    ...song,
    id: path.basename(f, '.json'),
  };
}

async function getSongs() {
  const files = await readdir(songsDir);
  const songs = await Promise.all(files.filter(f => f.endsWith('.json')).map(loadSong));
  return songs.sort((a, b) => a.title.localeCompare(b.title));
}

async function getSong(_, { id }) {
  return loadSong(`${id}.json`);
}

export const resolvers = {
  Query: {
    songs: getSongs,
    song: getSong,
  },
};
