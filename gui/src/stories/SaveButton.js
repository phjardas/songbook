import { FormControlLabel, Switch } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import SaveButton from '../components/SaveButton';
import { Pad } from './helpers';
import { withTheme } from './theme';

const delay = 3000;

class Controller extends React.Component {
  state = { saving: false, saved: false, valid: true };

  render() {
    return (
      <Pad>
        <p>
          <FormControlLabel
            label="valid"
            control={<Switch color="primary" checked={this.state.valid} onChange={e => this.setState({ valid: e.target.checked })} />}
          />
        </p>
        <SaveButton {...this.state} onClick={this.submit} />
      </Pad>
    );
  }

  submit = () => {
    this.setState({ saving: true, saved: false });
    setTimeout(() => {
      this.setState({ saving: false, saved: true });
      setTimeout(() => this.setState({ saving: false, saved: false }), delay);
    }, delay);
  };
}

storiesOf('SaveButton', module)
  .addDecorator(withTheme)
  .add('regular', () => <Controller />);
