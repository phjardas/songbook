import { withStyles } from '@material-ui/core';
import React from 'react';
import { Context } from '../providers/Auth';

export const Pad = withStyles({}, { withTheme: true })(({ units = 1, theme, children }) => (
  <div style={{ padding: units * theme.spacing.unit }}>{children}</div>
));

export function MockAuthProvider({ pending, user, children }) {
  return <Context.Provider value={{ pending, user }}>{children}</Context.Provider>;
}
