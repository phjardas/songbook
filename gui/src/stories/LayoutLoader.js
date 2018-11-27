import { storiesOf } from '@storybook/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import LayoutLoader from '../components/LayoutLoader';
import { withTheme } from './theme';

storiesOf('LayoutLoader', module)
  .addDecorator(withTheme)
  .add('regular', () => (
    <HashRouter>
      <LayoutLoader />
    </HashRouter>
  ));
