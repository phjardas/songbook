import { storiesOf } from '@storybook/react';
import React from 'react';
import SongLyrics from '../components/SongLyrics';
import { parseLyrics } from '../opensong';
import { Pad } from './helpers';
import { withTheme } from './theme';

const lyrics = parseLyrics(`
[Intro]
.C F G C

[V1]
.C       F
 This is some text.
.G              C
 And here comes some more.
`);

storiesOf('SongLyrics', module)
  .addDecorator(withTheme)
  .add('without transpose', () => (
    <Pad>
      <SongLyrics lyrics={lyrics} />
    </Pad>
  ))
  .add('with transpose', () => (
    <Pad>
      <SongLyrics lyrics={lyrics} originalKey="C" />
    </Pad>
  ));
