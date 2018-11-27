import { storiesOf } from '@storybook/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import CreateSongButton from '../components/CreateSongButton';
import { Pad } from './helpers';
import { withTheme } from './theme';

storiesOf('CreateSongButton', module)
  .addDecorator(withTheme)
  .add('fab', () => (
    <HashRouter>
      <Pad units={3}>
        <CreateSongButton variant="fab" color="secondary" />
      </Pad>
    </HashRouter>
  ))
  .add('primary', () => (
    <HashRouter>
      <Pad units={3}>
        <CreateSongButton withLabel variant="extendedFab" color="primary" />
      </Pad>
    </HashRouter>
  ));
