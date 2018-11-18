import { withStyles } from '@material-ui/core';
import React from 'react';

export const Pad = withStyles({}, { withTheme: true })(({ units = 1, theme, children }) => (
  <div style={{ padding: units * theme.spacing.unit }}>{children}</div>
));
