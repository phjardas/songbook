import { Add as AddIcon } from '@mui/icons-material';
import ButtonLink from './ButtonLink';

export default function CreateSongButton({ withLabel, iconSx, ...props }) {
  return (
    <ButtonLink to="/songs/_new" aria-label="Create Song" {...props}>
      <AddIcon sx={iconSx} />
      {withLabel && 'Create Song'}
    </ButtonLink>
  );
}
