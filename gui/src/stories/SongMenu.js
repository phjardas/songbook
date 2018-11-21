import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SongMenu from '../components/SongMenu';
import { Pad } from './helpers';
import { withTheme } from './theme';

function Song({ song }) {
  const [transposedKey, setTransposedKey] = useState(song.key);
  return (
    <BrowserRouter>
      <Pad units={2}>
        <SongMenu song={song} transposedKey={transposedKey} onKeyChange={setTransposedKey} />
        <p>Original key: {song.key}</p>
        <p>Transposed key: {transposedKey}</p>
      </Pad>
    </BrowserRouter>
  );
}

storiesOf('SongMenu', module)
  .addDecorator(withTheme)
  .add('owned with key', () => <Song song={{ key: 'Fm', isOwner: true }} />)
  .add('owned without key', () => <Song song={{ isOwner: true }} />)
  .add('shared with key', () => <Song song={{ key: 'Fm' }} />)
  .add('shared without key', () => <Song song={{}} />);
