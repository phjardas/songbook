import React from 'react';
import Chord from './Chord';
import styled from 'styled-components';

const Table = styled.table`
  margin-bottom: 0.5rem;
  line-height: 1;
`;

const ChordsRow = styled.tr`
  td {
    line-height: 1.2;
    padding-right: 0.5rem;

    &:last-child {
      padding-right: 0;
    }
  }
`;

const LyricsRow = styled.tr`
  td {
    padding-right: 0.2rem;

    &:last-child {
      padding-right: 0;
    }
  }
`;

export default function SongLyricsLine({ chords, lyrics }) {
  return (
    <Table>
      <tbody>
        {chords &&
          chords.length && (
            <ChordsRow>
              {chords.map((chord, i) => (
                <td key={i}>
                  <Chord chord={chord} />
                </td>
              ))}
            </ChordsRow>
          )}
        {lyrics &&
          lyrics.length && (
            <LyricsRow>
              {lyrics.map((lyric, i) => (
                <td key={i}>{lyric}</td>
              ))}
            </LyricsRow>
          )}
      </tbody>
    </Table>
  );
}
