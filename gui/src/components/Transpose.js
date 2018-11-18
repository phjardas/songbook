import { MenuItem, Paper, Select, withStyles } from '@material-ui/core';
import { transpose } from 'chord-transposer';
import React from 'react';
import Pitch from './Pitch';

const majorKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const minorKeys = ['Cm', 'C#m', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'Bbm', 'Bm'];

class Transpose extends React.Component {
  state = {
    transposedKey: this.props.originalKey,
    transposedLyrics: this.props.lyrics,
  };

  render() {
    const { children, lyrics, originalKey, classes } = this.props;

    if (!originalKey) {
      return children({ lyrics });
    }

    const { transposedKey, transposedLyrics } = this.state;
    const keys = originalKey.endsWith('m') ? minorKeys : majorKeys;

    return (
      <>
        <Paper className={classes.box}>
          <span className={classes.text}>
            Transpose from{' '}
            <strong>
              <Pitch pitch={originalKey} />
            </strong>{' '}
            to
          </span>
          <Select id="transpose" value={transposedKey} onChange={e => this.transposeTo(e.target.value)}>
            {keys.map(key => (
              <MenuItem key={key} value={key}>
                <Pitch pitch={key} />
              </MenuItem>
            ))}
          </Select>
        </Paper>

        {children({ lyrics: transposedLyrics })}
      </>
    );
  }

  transposeTo = transposedKey => {
    const { lyrics, originalKey } = this.props;

    const transposer = chord => {
      if (!chord.trim()) return chord;
      return transpose(chord)
        .fromKey(originalKey)
        .toKey(transposedKey)
        .toString();
    };

    const transposedLyrics = lyrics.map(section => ({
      ...section,
      lines: section.lines.map(line => ({
        ...line,
        chords: line.chords && line.chords.map(transposer),
      })),
    }));

    this.setState({
      transposedKey,
      transposedLyrics,
    });
  };
}

const styles = ({ typography, spacing }) => ({
  box: {
    padding: `${spacing.unit}px ${spacing.unit * 2}px`,
    marginTop: spacing.unit * 2,
    display: 'inline-block',
    '@media print': {
      display: 'none',
    },
  },
  text: {
    marginRight: spacing.unit,
    ...typography.body1,
  },
});

export default withStyles(styles)(Transpose);
