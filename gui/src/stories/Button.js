import { Button, Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Pad } from './helpers';
import { withTheme } from './theme';

const colors = ['default', 'primary', 'secondary'];
const variants = ['text', 'outlined', 'contained'];

function Buttons(props) {
  return (
    <Pad units={2}>
      <Grid container spacing={8}>
        {colors.map(color => (
          <Grid key={color} item>
            <Button color={color} {...props}>
              {color}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Pad>
  );
}

const story = storiesOf('Button', module).addDecorator(withTheme);
variants.forEach(variant => story.add(variant, () => <Buttons variant={variant} />));
