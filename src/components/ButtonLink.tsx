import { Button } from '@mui/material';
import type { ComponentType } from 'react';
import { Link } from 'react-router';

// ponytail: loosely typed; MUI's polymorphic `component` prop types do not compose through a generic wrapper.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ButtonLinkProps = { Component?: ComponentType<any>; to: string; [prop: string]: unknown };

export default function ButtonLink({ Component = Button, ...props }: ButtonLinkProps) {
  return <Component component={Link} {...props} />;
}
