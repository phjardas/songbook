import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MobileSongActions } from '../components/SongMenu';
import { Pad } from './helpers';
import { withTheme } from './theme';
import { AppBar, Toolbar } from '@material-ui/core';

function Song({ song }) {
  const [transposedKey, setTransposedKey] = useState(song.key);
  return (
    <BrowserRouter>
      <>
        <AppBar position="static" color="primary">
          <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MobileSongActions song={song} transposedKey={transposedKey} onKeyChange={setTransposedKey} />
          </Toolbar>
        </AppBar>
        <Pad>
          <p>Original key: {song.key || <em>none</em>}</p>
          <p>Transposed key: {transposedKey || <em>none</em>}</p>
        </Pad>
      </>
    </BrowserRouter>
  );
}

storiesOf('SongMenu/mobile', module)
  .addDecorator(withTheme)
  .add('owned, public, with key', () => <Song song={{ key: 'Fm', meta: { owned: true, draft: false } }} />)
  .add('owned, public, without key', () => <Song song={{ meta: { owned: true, draft: false } }} />)
  .add('owned, draft, with key', () => <Song song={{ key: 'Fm', meta: { owned: true, draft: true } }} />)
  .add('owned, draft, without key', () => <Song song={{ meta: { owned: true, draft: true } }} />)
  .add('not owned, public, with key', () => <Song song={{ key: 'Fm', meta: { owned: false, draft: false } }} />)
  .add('not owned, public, without key', () => <Song song={{ meta: { owned: false, draft: false } }} />);
