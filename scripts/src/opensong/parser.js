import xml2js from 'xml2js';

export async function parseOpenSong(xml) {
  const { song } = await new Promise((resolve, reject) => xml2js.parseString(xml, (err, result) => (err ? reject(err) : resolve(result))));
  const title = song.title[0];
  const author = song.author[0];
  const key = song.key[0];
  const lyrics = song.lyrics[0];

  return {
    title,
    author,
    key,
    lyrics,
  };
}
