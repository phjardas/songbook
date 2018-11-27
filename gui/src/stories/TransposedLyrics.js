import { Button } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import SongLyrics from '../components/SongLyrics';
import TransposedLyrics from '../components/TransposedLyrics';
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

[C]
.Bb             Eb
 And here's the chorus!
`);

const originalKey = 'C';

function Controller() {
  const [actualKey, setKey] = useState(originalKey);

  return (
    <Pad>
      {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(key => (
        <Button key={key} variant={key === actualKey ? 'outlined' : 'text'} onClick={() => setKey(key)}>
          {key}
        </Button>
      ))}

      <TransposedLyrics lyrics={lyrics} originalKey={originalKey} actualKey={actualKey}>
        {({ lyrics }) => <SongLyrics lyrics={lyrics} />}
      </TransposedLyrics>
    </Pad>
  );
}

storiesOf('TransposedLyrics', module)
  .addDecorator(withTheme)
  .add('regular', () => <Controller />);
