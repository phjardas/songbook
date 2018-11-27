import { storiesOf } from '@storybook/react';
import React from 'react';
import GlobalLoader from '../components/GlobalLoader';
import { withTheme } from './theme';

storiesOf('GlobalLoader', module)
  .addDecorator(withTheme)
  .add('regular', () => <GlobalLoader />);
