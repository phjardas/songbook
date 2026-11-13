import { Edit as EditIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useState } from 'react';
import parseLyrics from '../parser';
import { transposeLyrics } from '../parser/transpose';
import { useIsDesktop } from '../providers/Theme';
import ButtonLink from './ButtonLink';
import Layout from './layout';
import PageQR from './PageQR';
import SongLyrics from './SongLyrics';
import { DesktopSongMenu, MobileSongActions } from './SongMenu';
import useMenuItems from './SongMenu/useMenuItems';
import UserChip from './UserChip';

const printBlack = { '@media print': { color: 'black' } };

export default function Song(props) {
  const { song } = props;
  const [transposedKey, setTransposedKey] = useState(song.key);
  const isDesktop = useIsDesktop();
  const { items, dialogs } = useMenuItems({ ...props, transposedKey, onKeyChange: setTransposedKey });
  const lyrics = parseLyrics({ type: song.lyricsType || 'opensong', lyrics: song.lyrics });

  const EditSongButton =
    song.meta.owned &&
    (fabProps => (
      <ButtonLink to={`${song.meta.url}/edit`} aria-label="Edit" {...fabProps}>
        <EditIcon />
      </ButtonLink>
    ));

  return (
    <Layout
      title={song.title}
      back={song.meta.draft ? '/drafts' : '/songs'}
      Fab={EditSongButton}
      Actions={() => <MobileSongActions items={items} />}
    >
      {dialogs}
      <PageQR />

      {isDesktop && <DesktopSongMenu song={song} items={items} />}

      <Box sx={{ p: 3 }}>
        <Box component="h1" sx={{ typography: 'h4', m: 0, ...printBlack }}>
          {song.title || <em>No Title</em>}
        </Box>
        <Box sx={{ typography: 'subtitle1', ...printBlack }}>by {song.author || <em>No author</em>}</Box>

        {!song.meta.draft && (
          <Box sx={{ typography: 'body2', '@media print': { display: 'none' } }}>
            Transcribed by <UserChip id={song.owner} />
          </Box>
        )}

        <SongLyrics lyrics={transposeLyrics(lyrics, song.key, transposedKey)} />
      </Box>
    </Layout>
  );
}
