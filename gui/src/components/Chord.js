import { withStyles } from '@material-ui/core';
import React from 'react';
import Pitch from './Pitch';

function Chord({ chord, classes }) {
  if (!chord.trim()) return null;
  const m = chord.match(/^([CDEFGAB][b#]?)(m?)(.*?)(\/.*)?$/);

  if (!m) {
    return (
      <span className={classes.chord}>
        <Pitch pitch={chord} />
      </span>
    );
  }
  // eslint-disable-next-line
  const [_, pitch, gender, alterations, inversion] = m;

  return (
    <span className={classes.chord}>
      <Pitch pitch={pitch} />
      {gender}
      {alterations && <sup>{alterations}</sup>}
      {inversion}
    </span>
  );
}

const styles = {
  chord: {
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.66)',
  },
};

export default withStyles(styles)(Chord);
