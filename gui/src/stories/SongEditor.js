import { storiesOf } from '@storybook/react';
import React from 'react';
import SongEditor from '../components/SongEditor';
import { Pad } from './helpers';
import { withTheme } from './theme';
import { BrowserRouter } from 'react-router-dom';

const song = {
  title: 'Test Song',
  author: 'Test Author',
  key: 'C',
  lyrics: `
[Intro]
.C F G C

[V1]
.C       F
 This is some text.
.G              C
 And here comes some more.
`,
};

async function saveSong(song) {
  console.log('saving song:', song);
  return new Promise(resolve => setTimeout(resolve, 3000));
}

async function saveSongFailed(song) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Something went wrong!')), 3000));
}

storiesOf('SongEditor', module)
  .addDecorator(withTheme)
  .add('regular', () => (
    <BrowserRouter>
      <Pad units={2}>
        <SongEditor song={song} saveSong={saveSong} />
      </Pad>
    </BrowserRouter>
  ))
  .add('error when saving', () => (
    <BrowserRouter>
      <Pad units={2}>
        <SongEditor song={song} saveSong={saveSongFailed} />
      </Pad>
    </BrowserRouter>
  ));
