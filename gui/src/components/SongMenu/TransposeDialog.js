import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  withMobileDialog,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { compose } from 'recompose';
import Pitch from '../Pitch';

const majorKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const minorKeys = ['Cm', 'C#m', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'Bbm', 'Bm'];

function TransposeDialog({ originalKey, transposedKey, onKeyChange, hide, classes, ...props }) {
  const keys = originalKey.endsWith('m') ? minorKeys : majorKeys;

  const selectKey = key => () => {
    onKeyChange(key);
    hide();
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Transpose Song</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = () => ({
  originalKey: {
    fontWeight: 600,
  },
});

export default compose(
  withStyles(styles),
  withMobileDialog()
)(TransposeDialog);
