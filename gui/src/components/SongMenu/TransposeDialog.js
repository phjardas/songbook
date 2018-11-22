import { List, ListItem, ListItemText, withStyles } from '@material-ui/core';
import React from 'react';
import Pitch from '../Pitch';
import { ResponsiveDialog } from '../dialog';

const majorKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const minorKeys = ['Cm', 'C#m', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'Bbm', 'Bm'];

function TransposeDialog({ originalKey, transposedKey, onKeyChange, classes, hide, ...props }) {
  const keys = originalKey.endsWith('m') ? minorKeys : majorKeys;

  const selectKey = key => () => {
    onKeyChange(key);
    hide();
  };

  return (
    <ResponsiveDialog {...props} hide={hide} title="Transpose Song">
      <List dense>
        {keys.map(key => (
          <ListItem key={key} button selected={key === transposedKey} onClick={selectKey(key)}>
            <ListItemText
              primary={
                <span className={key === originalKey ? classes.originalKey : null}>
                  <Pitch pitch={key} />
                  {key === originalKey && ` (original key)`}
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
    </ResponsiveDialog>
  );
}

const styles = () => ({
  originalKey: {
    fontWeight: 600,
  },
});

export default withStyles(styles)(TransposeDialog);
