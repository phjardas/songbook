import React from 'react';
import { Alert } from 'reactstrap';
import FontAwesome from './FontAwesome';

export default function Loading({ message = 'loading…' }) {
  return (
    <Alert color="info">
      <FontAwesome icon="spinner" className="fa-pulse" /> {message}
    </Alert>
  );
}
