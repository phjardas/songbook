import { useMediaQuery } from '@mui/material';
import { createTheme, type PaletteOptions } from '@mui/material/styles';
import { type ColorRoles, dark, light } from './colors';

declare module '@mui/material/styles' {
  interface Palette {
    m3: ColorRoles;
  }
  interface PaletteOptions {
    m3?: ColorRoles;
  }
}

function palette(m3: ColorRoles): PaletteOptions {
  return {
    m3,
    primary: { main: m3.primary, contrastText: m3.onPrimary },
    secondary: { main: m3.secondary, contrastText: m3.onSecondary },
    error: { main: m3.error, contrastText: m3.onError },
    background: { default: m3.surface, paper: m3.surfaceContainerLow },
    text: { primary: m3.onSurface, secondary: m3.onSurfaceVariant },
    divider: m3.outlineVariant,
  };
}

const font = '"Roboto Flex", Roboto, system-ui, sans-serif';

// M3 type scale (size / line height / weight); MUI variants map onto the M3 roles.
const type = (fontSize: number, lineHeight: number, fontWeight = 400, letterSpacing = 0) => ({
  fontSize: `${fontSize / 16}rem`,
  lineHeight: `${lineHeight / 16}rem`,
  fontWeight,
  letterSpacing: `${letterSpacing}px`,
});

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'media' },
  colorSchemes: {
    light: { palette: palette(light) },
    dark: { palette: palette(dark) },
  },
  breakpoints: {
    // M3 window size classes: compact < 600, medium < 840, expanded >= 840.
    values: { xs: 0, sm: 600, md: 840, lg: 1200, xl: 1600 },
  },
  // M3 extra-small; larger shapes are set explicitly in px where they matter.
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: font,
    h1: type(45, 52), // display medium
    h2: type(36, 44, 450), // display small
    h3: type(32, 40), // headline large
    h4: type(28, 36), // headline medium
    h5: type(24, 32), // headline small
    h6: type(22, 28), // title large
    subtitle1: type(16, 24, 500, 0.15), // title medium
    subtitle2: type(14, 20, 500, 0.1), // title small
    body1: type(16, 24, 400, 0.5), // body large
    body2: type(14, 20, 400, 0.25), // body medium
    caption: type(12, 16, 400, 0.4), // body small
    button: { ...type(14, 20, 500, 0.1), textTransform: 'none' }, // label large
    overline: { ...type(11, 16, 500, 0.5), textTransform: 'none' }, // label small
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: 'var(--mui-palette-m3-surface)' },
        '@media print': {
          body: { backgroundColor: '#fff', color: '#000' },
          '.no-print': { display: 'none !important' },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 20, minHeight: 40, paddingInline: 24 },
        text: { paddingInline: 12 },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { color: 'var(--mui-palette-m3-onSurfaceVariant)' } },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: 'none',
          backgroundColor: 'var(--mui-palette-m3-primaryContainer)',
          color: 'var(--mui-palette-m3-onPrimaryContainer)',
          boxShadow: 'var(--mui-shadows-3)',
          '&:hover': { backgroundColor: 'var(--mui-palette-m3-primaryContainer)', boxShadow: 'var(--mui-shadows-4)' },
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'inherit' },
      styleOverrides: {
        root: { backgroundColor: 'var(--mui-palette-m3-surface)', color: 'var(--mui-palette-m3-onSurface)' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 28, backgroundColor: 'var(--mui-palette-m3-surfaceContainerHigh)', backgroundImage: 'none' },
      },
    },
    MuiDialogTitle: {
      styleOverrides: { root: { ...type(24, 32), paddingTop: 24, paddingInline: 24 } },
    },
    MuiDialogActions: {
      styleOverrides: { root: { padding: '8px 24px 24px' } },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { borderRadius: 4, backgroundColor: 'var(--mui-palette-m3-surfaceContainer)', backgroundImage: 'none' },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'var(--mui-palette-m3-inverseSurface)',
          color: 'var(--mui-palette-m3-inverseOnSurface)',
          '& .MuiButton-root': { color: 'var(--mui-palette-m3-inversePrimary)' },
          '& .MuiIconButton-root': { color: 'var(--mui-palette-m3-inverseOnSurface)' },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          ...type(12, 16, 400, 0.4),
          borderRadius: 4,
          backgroundColor: 'var(--mui-palette-m3-inverseSurface)',
          color: 'var(--mui-palette-m3-inverseOnSurface)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, height: 32, ...type(14, 20, 500, 0.1) },
        outlined: { borderColor: 'var(--mui-palette-m3-outlineVariant)' },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': { backgroundColor: 'var(--mui-palette-m3-secondaryContainer)' },
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: { ...type(14, 20, 500, 0.1), color: 'var(--mui-palette-m3-primary)', backgroundColor: 'var(--mui-palette-m3-surface)' },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});

export const useIsDesktop = () => useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
