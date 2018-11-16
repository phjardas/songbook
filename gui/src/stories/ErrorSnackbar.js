import { Button } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { Pad } from './helpers';
import { withTheme } from './theme';

class Controller extends React.Component {
  state = {};

  render() {
    const { error } = this.state;

    return (
      <>
        <Pad>
          <Button color="primary" variant="contained" onClick={this.toggle}>
            {error ? 'hide' : 'show'}
          </Button>
        </Pad>
        <ErrorSnackbar error={error} />
      </>
    );
  }

  toggle = () => this.setState({ error: !this.state.error && new Error('This is an error message.') });
}

storiesOf('ErrorSnackbar', module)
  .addDecorator(withTheme)
  .add('regular', () => <Controller />);
