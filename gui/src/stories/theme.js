import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { theme } from '../theme';

export function withTheme(storyFn) {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>{storyFn()}</MuiThemeProvider>
    </>
  );
}
