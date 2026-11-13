import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ButtonLink({ Component = Button, ...props }) {
  return <Component {...props} component={Link} />;
}
