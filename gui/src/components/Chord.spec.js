import { parseChord } from './Chord';

describe('components', () => {
  describe('Chord', () => {
    describe('parseChord', () => {
      [
        { input: 'C', expected: { pitch: 'C' } },
        { input: 'C#', expected: { pitch: 'C#' } },
        { input: 'Cm', expected: { pitch: 'C', gender: 'm' } },
        { input: 'C-', expected: { pitch: 'C', gender: '-' } },
        { input: 'C-7b5', expected: { pitch: 'C', gender: '-', alterations: '7b5' } },
        { input: 'Cdim', expected: { pitch: 'C', alterations: 'dim' } },
        { input: 'Bbm', expected: { pitch: 'Bb', gender: 'm' } },
        { input: 'Bb7', expected: { pitch: 'Bb', alterations: '7' } },
        { input: 'Bbm7', expected: { pitch: 'Bb', gender: 'm', alterations: '7' } },
        { input: 'C##11', expected: { pitch: 'C#', alterations: '#11' } },
        { input: 'C/G', expected: { pitch: 'C', inversion: '/G' } },
        { input: 'C#m11/G#', expected: { pitch: 'C#', gender: 'm', alterations: '11', inversion: '/G#' } },
        { input: 'Cmaj7', expected: { pitch: 'C', alterations: 'maj7' } },
      ].forEach(({ input, expected }) => {
        it(`should parse input: ${input}`, () => {
          expect(parseChord(input)).toEqual(expected);
        });
      });
    });
  });
});
