import { ArrowBack, MoreVert } from '@mui/icons-material';
import { AppBar, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip } from '@mui/material';
import { type ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { MenuItem as Action } from '../SongMenu/useMenuItems';

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

function OverflowMenu({ actions }: { actions: Action[] }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const close = () => setAnchor(null);

  return (
    <>
      <IconButton onClick={e => setAnchor(e.currentTarget)} aria-label="More actions">
        <MoreVert />
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={close}>
        {actions.map(({ Icon, label, onClick }) => (
          <MenuItem
            key={label}
            onClick={() => {
              close();
              onClick();
            }}
            sx={{ minWidth: 180 }}
          >
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

interface Props {
  title?: string;
  back?: string;
  actions?: Action[];
  /** How many actions show as icon buttons before the rest move into the overflow menu. */
  inlineActions: number;
  trailing?: ReactNode;
  maxWidth: number;
  /** For pages that show the title as a headline: the bar only shows it once the headline has scrolled away. */
  titleOnScroll?: boolean;
}

export default function TopAppBar({ title, back, actions = [], inlineActions, trailing, maxWidth, titleOnScroll }: Props) {
  const scrolled = useScrolled();
  const inline = actions.length > inlineActions + 1 ? actions.slice(0, inlineActions) : actions;
  const overflow = actions.slice(inline.length);

  return (
    <AppBar
      position="sticky"
      className="no-print"
      sx={{ bgcolor: scrolled ? 'm3.surfaceContainer' : 'm3.surface', transition: 'background-color 200ms' }}
    >
      <Toolbar sx={{ gap: 0.5, minHeight: { xs: 64 }, width: '100%', maxWidth, mx: 'auto' }}>
        {back && (
          <Tooltip title="Back">
            <IconButton component={Link} to={back} edge="start" aria-label="Back" sx={{ color: 'm3.onSurface' }}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
        )}
        <Box
          component="h1"
          sx={{
            typography: 'h6',
            m: 0,
            ml: back ? 0.5 : 0,
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            opacity: titleOnScroll && !scrolled ? 0 : 1,
            transition: 'opacity 200ms',
          }}
        >
          {title}
        </Box>
        {inline.map(({ Icon, label, onClick }) => (
          <Tooltip title={label} key={label}>
            <IconButton onClick={onClick} aria-label={label}>
              <Icon />
            </IconButton>
          </Tooltip>
        ))}
        {overflow.length > 0 && <OverflowMenu actions={overflow} />}
        {trailing}
      </Toolbar>
    </AppBar>
  );
}
