import { transpose } from 'chord-transposer';
import React from 'react';
import { Alert, CustomInput, Form } from 'reactstrap';
import styled from 'styled-components';
import Pitch, { renderPitch } from './Pitch';

const majorKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const minorKeys = ['Cm', 'C#m', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'Bbm', 'Bm'];

const TransposeBox = styled(Alert)`
  @media (min-width: 768px) {
    margin-top: -6rem;
  }

  @media print {
    display: none;
  }
`;

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
        <TransposeBox color="info" className="float-md-right">
          <Form inline>
            <span className="mr-2">
              Transpose from{' '}
              <strong>
                <Pitch pitch={originalKey} />
              </strong>{' '}
              to
            </span>
            <CustomInput id="transpose" type="select" value={transposedKey} onChange={e => this.transposeTo(e.target.value)}>
              {keys.map(key => (
                <option key={key} value={key}>
                  {renderPitch(key)}
                </option>
              ))}
            </CustomInput>
          </Form>
        </TransposeBox>

        {children({ lyrics: transposedLyrics })}
      </>
    );
  }

  transposeTo = transposedKey => {
    const { lyrics, originalKey } = this.props;

    const transposer = chord => {
      if (!chord.trim()) return chord;
      return transpose(sanitizeChord(chord))
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

function sanitizeChord(chord) {
  return chord.replace(/^Gbm/, 'F#m');
}
