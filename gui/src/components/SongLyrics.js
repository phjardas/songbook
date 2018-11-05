import React from 'react';
import SongLyricsSection from './SongLyricsSection';
import Transpose from './Transpose';

export default props => (
  <Transpose {...props}>
    {({ lyrics }) =>
      lyrics.map((section, i) => (
        <div className="mt-5">
          <SongLyricsSection key={i} section={section} />
        </div>
      ))
    }
  </Transpose>
);
