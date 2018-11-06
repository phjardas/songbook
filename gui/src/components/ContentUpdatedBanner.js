import React from 'react';
import { Alert, Button } from 'reactstrap';
import styled from 'styled-components';
import FontAwesome from './FontAwesome';

const Banner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0;
  z-index: 10;

  .alert {
    margin: 0;
  }
`;

export default function ContentUpdatedBanner() {
  return (
    <Banner>
      <Alert color="info">
        <FontAwesome icon="exclamation-circle" className="mr-2" />
        The app has been updated.{' '}
        <Button color="info" onClick={() => window.location.reload()}>
          Please reload
        </Button>
      </Alert>
    </Banner>
  );
}
