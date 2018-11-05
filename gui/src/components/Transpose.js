import React from 'react';
import { Alert, Input, Form } from 'reactstrap';
import { transpose } from 'chord-transposer';

const majorKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const minorKeys = ['Cm', 'C#m', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'Bbm', 'Bm'];

export default class Transpose extends React.Component {
  state = {
    transposedKey: this.props.originalKey,
    transposedLyrics: this.props.lyrics,
  };

  render() {
    const { children, lyrics, originalKey } = this.props;

    if (!originalKey) {
      return children({ lyrics });
    }

    const { transposedKey, transposedLyrics } = this.state;
    const keys = originalKey.endsWith('m') ? minorKeys : majorKeys;

    return (
      <>
        <Alert color="info">
          <Form inline>
            <span className="mr-2">
              Transpose from <strong>{originalKey}</strong> to
            </span>
            <Input type="select" value={transposedKey} onChange={e => this.transposeTo(e.target.value)}>
              {keys.map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Input>
          </Form>
        </Alert>

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
