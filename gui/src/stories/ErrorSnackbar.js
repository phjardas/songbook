import { Button } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { Pad } from './helpers';
import { withTheme } from './theme';

function Controller() {
  const [error, setError] = useState(null);

  return (
    <>
      <Pad>
        <Button color="primary" variant="contained" onClick={() => setError(error ? null : new Error('This is an error message.'))}>
          {error ? 'hide' : 'show'}
        </Button>
      </Pad>
      <ErrorSnackbar error={error} />
    </>
  );
}

storiesOf('ErrorSnackbar', module)
  .addDecorator(withTheme)
  .add('regular', () => <Controller />);
