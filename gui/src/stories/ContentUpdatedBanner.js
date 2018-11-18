import { Button } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import ContentUpdatedBanner from '../components/ContentUpdatedBanner';
import { Pad } from './helpers';
import { withTheme } from './theme';

function Controller() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Pad>
        <Button color="primary" variant="contained" onClick={() => setShow(!show)}>
          {show ? 'hide' : 'show'}
        </Button>
      </Pad>
      {show && <ContentUpdatedBanner />}
    </>
  );
}

storiesOf('ContentUpdatedBanner', module)
  .addDecorator(withTheme)
  .add('regular', () => <Controller />);
