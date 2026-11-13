import { Add as AddIcon } from '@mui/icons-material';
import type { SxProps, Theme } from '@mui/material';
import ButtonLink, { type ButtonLinkProps } from './ButtonLink';

export default function CreateSongButton({
  withLabel,
  iconSx,
  ...props
}: Omit<ButtonLinkProps, 'to'> & { withLabel?: boolean; iconSx?: SxProps<Theme> }) {
  return (
    <ButtonLink to="/songs/_new" aria-label="Create Song" {...props}>
      <AddIcon sx={iconSx} />
      {withLabel && 'Create Song'}
    </ButtonLink>
  );
}
