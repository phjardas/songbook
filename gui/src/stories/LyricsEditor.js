import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import LyricsEditor from '../components/LyricsEditor';
import { Pad } from './helpers';
import { withTheme } from './theme';

const scenarios = [
  {
    label: 'OpenSong',
    type: 'opensong',
    lyrics: `[Intro]
.C F G C

[V1]
.C       F
 This is some text.
.G              C
 And here comes some more.
`,
  },
  {
    label: 'OpenSong with errors',
    type: 'opensong',
    lyrics: `[Intro]
.C F G C
This line is wrong.

[V1]
.C       F
 This is some text.
.G              C
 And here comes some more.
And here's yet another error.
`,
  },
  {
    label: 'ChordPro',
    type: 'chordpro',
    lyrics: `{start_of_intro}
[C][F][G][C]
{end_of_intro}

{start_of_verse: Verse 1}
[C]This is [G]some text.
[G]And here comes [C]some more.
{end_of_verse}
`,
  },
  {
    label: 'ChordPro with errors',
    type: 'chordpro',
    lyrics: `{start_of_intro}
[C][F][G][C]

{start_of_verse: Verse 1}
[C]This is [G]some text.
[G]And here comes [C]some more.
{end_of_chorus}
`,
  },
];

function Controller({ lyrics: initialLyrics, type = 'opensong' }) {
  const [lyrics, setLyrics] = useState(initialLyrics);

  return (
    <Pad units={2}>
      <LyricsEditor lyrics={lyrics} lyricsType={type} onChange={setLyrics} />
    </Pad>
  );
}

const stories = storiesOf('LyricsEditor', module).addDecorator(withTheme);

scenarios.forEach(({ label, lyrics, type }) => stories.add(label, () => <Controller lyrics={lyrics} type={type} />));
