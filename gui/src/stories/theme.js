import React from 'react';
import { ThemeProvider } from '../providers/Theme';

export function withTheme(storyFn) {
  return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
}
