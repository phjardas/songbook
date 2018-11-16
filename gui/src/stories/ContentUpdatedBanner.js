import { Button } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import ContentUpdatedBanner from '../components/ContentUpdatedBanner';
import { Pad } from './helpers';
import { withTheme } from './theme';

class Controller extends React.Component {
  state = { show: false };

  render() {
    const { show } = this.state;
    return (
      <>
        <Pad>
          <Button color="primary" variant="contained" onClick={this.toggle}>
            {show ? 'hide' : 'show'}
          </Button>
        </Pad>
        <ContentUpdatedBanner show={show} />
      </>
    );
  }

  toggle = () => this.setState({ show: !this.state.show });
}

storiesOf('ContentUpdatedBanner', module)
  .addDecorator(withTheme)
  .add('regular', () => <Controller />);
