import { storiesOf } from '@storybook/react';
import React from 'react';
import Logo from '../components/Logo';
import { withTheme } from './theme';
import { Pad } from './helpers';
import { Grid } from '@material-ui/core';

storiesOf('Logo', module)
  .addDecorator(withTheme)
  .add('regular', () => (
    <Pad units={2}>
      <Grid container spacing={16}>
        <Grid item>
          <Logo />
        </Grid>
        <Grid item>
          <Logo style={{ color: 'green' }} />
        </Grid>
        <Grid item>
          <Logo style={{ color: 'red' }} />
        </Grid>
        <Grid item>
          <Logo style={{ color: 'blue' }} />
        </Grid>
      </Grid>
    </Pad>
  ));
