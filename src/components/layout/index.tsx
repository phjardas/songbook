import { Add as AddIcon } from '@mui/icons-material';
import { Box, Fab, Tooltip } from '@mui/material';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useIsDesktop } from '../../theme';
import Logo from '../Logo';
import type { MenuItem as Action } from '../SongMenu/useMenuItems';
import AccountMenu from './AccountMenu';
import Destination from './Destination';
import { destinations } from './destinations';
import TopAppBar from './TopAppBar';

export interface LayoutProps {
  title?: string;
  /** Detail pages link back to their list instead of showing the navigation bar on phones. */
  back?: string;
  actions?: Action[];
  children?: ReactNode;
  /** Width of the content column; reading views use a narrower measure. */
  maxWidth?: number;
  /** The page shows its own headline; the top app bar title appears after scrolling. */
  titleOnScroll?: boolean;
}

const newSong = { to: '/songs/_new', label: 'New song' };

function NavigationRail() {
  return (
    <Box
      component="nav"
      className="no-print"
      sx={{
        position: 'fixed',
        inset: '0 auto 0 0',
        width: 96,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        pt: 2,
        pb: 3,
        bgcolor: 'm3.surface',
        zIndex: 'appBar',
      }}
    >
      <Box component={Link} to="/songs" aria-label="Songbook" sx={{ color: 'm3.primary', display: 'grid', mb: 1 }}>
        <Logo width={28} height={28} />
      </Box>
      <Tooltip title={newSong.label} placement="right">
        <Fab component={Link} to={newSong.to} aria-label={newSong.label} sx={{ mb: 3 }}>
          <AddIcon />
        </Fab>
      </Tooltip>
      {destinations.map(d => (
        <Destination key={d.to} {...d} indicatorWidth={56} />
      ))}
      <Box sx={{ flex: 1 }} />
      <AccountMenu />
    </Box>
  );
}

function NavigationBar() {
  return (
    <Box
      component="nav"
      className="no-print"
      sx={{
        position: 'fixed',
        inset: 'auto 0 0 0',
        height: 80,
        pb: 'env(safe-area-inset-bottom)',
        display: 'grid',
        gridTemplateColumns: `repeat(${destinations.length}, 1fr)`,
        alignItems: 'center',
        bgcolor: 'm3.surfaceContainer',
        zIndex: 'appBar',
      }}
    >
      {destinations.map(d => (
        <Destination key={d.to} {...d} indicatorWidth={64} />
      ))}
    </Box>
  );
}

export default function Layout({ title, back, actions, children, maxWidth = 840, titleOnScroll }: LayoutProps) {
  const isDesktop = useIsDesktop();
  const topLevel = !back;
  const showFab = !isDesktop && topLevel;

  return (
    <>
      <title>{title ? `${title} - Songbook` : 'Songbook'}</title>
      {isDesktop && <NavigationRail />}

      <Box sx={{ ml: isDesktop ? '96px' : 0, pb: topLevel && !isDesktop ? '96px' : 3, '@media print': { m: 0, p: 0 } }}>
        <TopAppBar
          title={title}
          back={back}
          actions={actions}
          inlineActions={isDesktop ? 6 : 2}
          maxWidth={maxWidth}
          titleOnScroll={titleOnScroll}
          trailing={!isDesktop && topLevel && <AccountMenu />}
        />
        <Box component="main" sx={{ maxWidth, mx: 'auto' }}>
          {children}
        </Box>
      </Box>

      {!isDesktop && topLevel && <NavigationBar />}
      {showFab && (
        <Fab
          component={Link}
          to={newSong.to}
          variant="extended"
          className="no-print"
          sx={{ position: 'fixed', right: 16, bottom: 96, gap: 1.5, pl: 2, pr: 2.5, height: 56 }}
        >
          <AddIcon />
          {newSong.label}
        </Fab>
      )}
    </>
  );
}
