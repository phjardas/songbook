import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Pitch from '../Pitch';

const majorKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const minorKeys = ['Cm', 'C#m', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'Bbm', 'Bm'];

interface Props {
  originalKey: string;
  transposedKey: string;
  onKeyChange: (key: string) => void;
  open: boolean;
  hide: () => void;
}

export default function TransposeDialog({ originalKey, transposedKey, onKeyChange, open, hide }: Props) {
  const keys = originalKey.endsWith('m') ? minorKeys : majorKeys;

  const selectKey = (key: string) => () => {
    onKeyChange(key);
    hide();
  };

  return (
    <Dialog open={open} onClose={hide} maxWidth="xs" fullWidth>
      <DialogTitle>Transpose</DialogTitle>
      <DialogContent>
        <Box sx={{ typography: 'body2', color: 'text.secondary', mb: 2 }}>
          Written in <Pitch pitch={originalKey} />. Pick the key to play in.
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 1 }}>
          {keys.map(key => {
            const selected = key === transposedKey;
            return (
              <Chip
                key={key}
                label={<Pitch pitch={key} />}
                aria-label={key === originalKey ? `${key} (original key)` : key}
                aria-pressed={selected}
                onClick={selectKey(key)}
                variant={selected ? 'filled' : 'outlined'}
                sx={{
                  fontSize: '1rem',
                  ...(selected && { bgcolor: 'm3.secondaryContainer', color: 'm3.onSecondaryContainer' }),
                  ...(key === originalKey && !selected && { borderColor: 'm3.outline', fontWeight: 700 }),
                }}
              />
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        {transposedKey !== originalKey && <Button onClick={selectKey(originalKey)}>Reset to original key</Button>}
        <Button onClick={hide}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
