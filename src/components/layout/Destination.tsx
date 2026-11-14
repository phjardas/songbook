import { Box, ButtonBase } from '@mui/material';
import { Link, useMatch } from 'react-router';
import type { destinations } from './destinations';

/** A navigation rail or navigation bar item: icon in a pill-shaped active indicator, label below. */
export default function Destination({
  to,
  label,
  Icon,
  ActiveIcon,
  indicatorWidth,
}: (typeof destinations)[number] & { indicatorWidth: number }) {
  const active = !!useMatch({ path: to, end: false });
  const CurrentIcon = active ? ActiveIcon : Icon;

  return (
    <ButtonBase
      component={Link}
      to={to}
      aria-current={active ? 'page' : undefined}
      disableRipple
      sx={{
        flexDirection: 'column',
        gap: 0.5,
        py: 0.5,
        borderRadius: '16px',
        color: active ? 'm3.onSurface' : 'm3.onSurfaceVariant',
        '&:hover .indicator': { bgcolor: active ? undefined : 'action.hover' },
        '&.Mui-focusVisible .indicator': { outline: '2px solid', outlineColor: 'm3.primary' },
      }}
    >
      <Box
        className="indicator"
        sx={{
          width: indicatorWidth,
          height: 32,
          borderRadius: '16px',
          display: 'grid',
          placeItems: 'center',
          bgcolor: active ? 'm3.secondaryContainer' : 'transparent',
          color: active ? 'm3.onSecondaryContainer' : 'inherit',
          transition: 'background-color 200ms',
        }}
      >
        <CurrentIcon />
      </Box>
      <Box component="span" sx={{ fontSize: '0.75rem', lineHeight: '1rem', fontWeight: active ? 700 : 500, letterSpacing: '0.5px' }}>
        {label}
      </Box>
    </ButtonBase>
  );
}
