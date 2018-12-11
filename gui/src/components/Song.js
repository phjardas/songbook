import { Hidden, withStyles } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import parseLyrics from '../parser';
import ButtonLink from './ButtonLink';
import Layout from './layout';
import PageQR from './PageQR';
import SongLyrics from './SongLyrics';
import { DesktopSongMenu, MobileSongActions } from './SongMenu';
import TransposedLyrics from './TransposedLyrics';
import UserChip from './UserChip';

function EditSongButton({ song }) {
  return (
    song.meta.owned &&
    (props => (
      <ButtonLink to={`${song.meta.url}/edit`} {...props}>
        <EditIcon />
      </ButtonLink>
    ))
  );
}

function Song({ classes, ...props }) {
  const { song } = props;
  const [transposedKey, setTransposedKey] = useState(song.key);

  return (
    <Layout
      title={song.title}
      back={song.meta.draft ? '/drafts' : '/songs'}
      Fab={EditSongButton({ song })}
      Actions={() => <MobileSongActions {...props} transposedKey={transposedKey} onKeyChange={setTransposedKey} />}
    >
      <PageQR />

      <Hidden smDown>
        <DesktopSongMenu {...props} transposedKey={transposedKey} onKeyChange={setTransposedKey} />
      </Hidden>

      <div className={classes.main}>
        <h1 className={classes.title}>{song.title || <em>No Title</em>}</h1>
        <div className={classes.author}>by {song.author || <em>No author</em>}</div>

        {!song.meta.draft && (
          <div className={classes.owner}>
            Transcribed by <UserChip id={song.owner} />
          </div>
        )}

        <TransposedLyrics
          lyrics={parseLyrics({ type: song.lyricsType || 'opensong', lyrics: song.lyrics })}
          originalKey={song.key}
          actualKey={transposedKey}
        >
          {({ lyrics }) => <SongLyrics lyrics={lyrics} />}
        </TransposedLyrics>
      </div>
    </Layout>
  );
}

const styles = ({ spacing, typography }) => ({
  main: {
    padding: spacing.unit * 3,
  },
  title: {
    ...typography.h4,
    margin: 0,
    '@media print': {
      color: 'black',
    },
  },
  author: {
    ...typography.subtitle1,
    '@media print': {
      color: 'black',
    },
  },
  owner: {
    ...typography.body2,
    '@media print': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(Song);
