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
.Am  Em    Dm      F       G   C
 Sometimes there's changes inbetween.

[V2]
  And sometimes there's
  several lines of lyrics
  in a row without chords.

[B]
.C F G C
.C F G C
.C F G C
.C F G C
`);

storiesOf('SongLyrics', module)
  .addDecorator(withTheme)
  .add('regular', () => (
    <Pad>
      <SongLyrics lyrics={lyrics} />
    </Pad>
  ));
