import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import ButtonLink from '../ButtonLink';
import NoprintTooltip from './NoprintTooltip';

export default function DesktopSongMenu({ song, items }) {
  const back = song.meta.draft ? '/drafts' : '/songs';

  return (
    <Box sx={{ ml: 1, display: 'flex', '@media print': { display: 'none' } }}>
      <NoprintTooltip title={`Back to ${song.meta.draft ? 'drafts' : 'songs'}`}>
        <ButtonLink color="inherit" Component={IconButton} to={back}>
          <ArrowBackIcon />
        </ButtonLink>
      </NoprintTooltip>

      {items.map(({ Icon, label, onClick }) => (
        <NoprintTooltip title={label} key={label}>
          <IconButton onClick={onClick} color="inherit" aria-label={label}>
            <Icon />
          </IconButton>
        </NoprintTooltip>
      ))}
    </Box>
  );
}
