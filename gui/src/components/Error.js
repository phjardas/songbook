import React from 'react';
import { Alert } from 'reactstrap';
import FontAwesome from './FontAwesome';

export default function Error({ message, error }) {
  return (
    <Alert color="danger">
      <FontAwesome icon="exclamation-triangle" className="mr-2" />
      {message && <strong>{message}: </strong>}
      {error.message}
    </Alert>
  );
}
