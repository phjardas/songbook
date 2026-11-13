import { List, ListItemButton, ListItemText } from '@mui/material';
import { ResponsiveDialog } from '../dialog';
import Pitch from '../Pitch';

const majorKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const minorKeys = ['Cm', 'C#m', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'Bbm', 'Bm'];

export default function TransposeDialog({ originalKey, transposedKey, onKeyChange, open, hide }) {
  const keys = originalKey.endsWith('m') ? minorKeys : majorKeys;

  const selectKey = key => () => {
    onKeyChange(key);
    hide();
  };

  return (
    <ResponsiveDialog open={open} hide={hide} title="Transpose Song">
      <List dense>
        {keys.map(key => (
          <ListItemButton key={key} selected={key === transposedKey} onClick={selectKey(key)}>
            <ListItemText
              primary={
                <span style={key === originalKey ? { fontWeight: 600 } : undefined}>
                  <Pitch pitch={key} />
                  {key === originalKey && ' (original key)'}
                </span>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </ResponsiveDialog>
  );
}
