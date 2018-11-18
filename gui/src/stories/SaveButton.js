import { FormControlLabel, Switch } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import SaveButton from '../components/SaveButton';
import { Pad } from './helpers';
import { withTheme } from './theme';

const delay = 3000;

function Controller() {
  const [valid, setValid] = useState(true);
  const [state, setState] = useState({ saving: false, saved: false });

  const submit = () => {
    setState({ saving: true, saved: false });
    setTimeout(() => {
      setState({ saving: false, saved: true });
      setTimeout(() => setState({ saving: false, saved: false }), delay);
    }, delay);
  };

  return (
    <Pad>
      <p>
        <FormControlLabel
          label="valid"
          control={<Switch color="primary" checked={valid} disabled={state.saving} onChange={e => setValid(e.target.checked)} />}
        />
      </p>
      <SaveButton {...state} valid={valid} onClick={submit} />
    </Pad>
  );
}

storiesOf('SaveButton', module)
  .addDecorator(withTheme)
  .add('regular', () => <Controller />);
