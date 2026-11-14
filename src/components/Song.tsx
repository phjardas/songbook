import { SwapVert } from '@mui/icons-material';
import { Box, Chip, Stack } from '@mui/material';
import { useState } from 'react';
import parseLyrics from '../parser';
import { transposeLyrics } from '../parser/transpose';
import Layout from './layout';
import PageQR from './PageQR';
import Pitch from './Pitch';
import SongLyrics from './SongLyrics';
import useMenuItems, { type SongActions } from './SongMenu/useMenuItems';
import UserChip from './UserChip';

export default function Song(props: SongActions) {
  const { song } = props;
  const [transposedKey, setTransposedKey] = useState(song.key);
  const { items, dialogs, openTranspose } = useMenuItems({ ...props, transposedKey, onKeyChange: setTransposedKey });
  const lyrics = parseLyrics({ type: song.lyricsType || 'opensong', lyrics: song.lyrics });
  const transposed = transposedKey !== song.key;

  return (
    <Layout title={song.title} back={song.meta.draft ? '/drafts' : '/songs'} actions={items} maxWidth={760} titleOnScroll>
      {dialogs}
      <PageQR />

      <Box component="article" sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 1, sm: 3 } }}>
        <Box component="h2" sx={{ typography: { xs: 'h3', sm: 'h2' }, fontWeight: 500, m: 0, '@media print': { color: '#000' } }}>
          {song.title || 'Untitled'}
        </Box>
        <Box sx={{ typography: 'h6', fontWeight: 400, color: 'text.secondary', mt: 0.5, '@media print': { color: '#000' } }}>
          {song.author || 'Unknown author'}
        </Box>

        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, mt: 2.5, mb: 1 }} className="no-print">
          {song.key && (
            <Chip
              icon={<SwapVert />}
              variant={transposed ? 'filled' : 'outlined'}
              color={transposed ? 'secondary' : 'default'}
              onClick={openTranspose}
              label={
                <>
                  Key of <Pitch pitch={transposedKey} />
                  {transposed && (
                    <>
                      {' '}
                      (written in <Pitch pitch={song.key} />)
                    </>
                  )}
                </>
              }
              sx={transposed ? { bgcolor: 'm3.secondaryContainer', color: 'm3.onSecondaryContainer' } : undefined}
            />
          )}
          {song.meta.draft ? <Chip variant="outlined" label="Draft" /> : <UserChip id={song.owner} />}
        </Stack>

        <SongLyrics lyrics={transposeLyrics(lyrics, song.key, transposedKey)} />
      </Box>
    </Layout>
  );
}
