import React from 'react';
import SongLyricsSection from './SongLyricsSection';
import Transpose from './Transpose';

export default props => (
  <Transpose {...props}>
    {({ lyrics }) => (
      <div className="mt-5">
        {lyrics.map((section, i) => (
          <SongLyricsSection key={i} section={section} />
        ))}
      </div>
    )}
  </Transpose>
);
