import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { theme } from '../theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
