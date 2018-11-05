import React from 'react';
import SongLyricsSection from './SongLyricsSection';
import Transpose from './Transpose';

export default props => (
  <Transpose {...props}>{({ lyrics }) => lyrics.map((section, i) => <SongLyricsSection key={i} section={section} />)}</Transpose>
);
