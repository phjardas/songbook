import React from 'react';
import { Alert } from 'reactstrap';
import FontAwesome from './FontAwesome';

export default function Loading({ message = 'loading…' }) {
  return (
    <Alert color="secondary">
      <FontAwesome icon="spinner" className="fa-pulse mr-2" /> {message}
    </Alert>
  );
}
