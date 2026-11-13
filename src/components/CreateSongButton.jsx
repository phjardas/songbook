import { Add as AddIcon } from '@material-ui/icons';
import React from 'react';
import ButtonLink from './ButtonLink';

export default function CreateSongButton({ withLabel, className = '', classes = {}, ...props }) {
  return (
    <ButtonLink to="/songs/_new" className={`${className} ${classes.root}`} {...props}>
      <AddIcon className={classes.icon} />
      {withLabel && 'Create Song'}
    </ButtonLink>
  );
}
