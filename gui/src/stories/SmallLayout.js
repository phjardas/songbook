import { storiesOf } from '@storybook/react';
import React from 'react';
import SmallLayout from '../components/SmallLayout';
import { withTheme } from './theme';

storiesOf('SmallLayout', module)
  .addDecorator(withTheme)
  .add('regular', () => <SmallLayout>content</SmallLayout>);
