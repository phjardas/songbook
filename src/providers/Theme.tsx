import type { ReactNode } from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { amber, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: amber,
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

// Material UI 3's Hidden smDown/mdUp and withMobileDialog switched at the md breakpoint.
export const useIsDesktop = () => useMediaQuery(theme => theme.breakpoints.up('md'), { noSsr: true });
