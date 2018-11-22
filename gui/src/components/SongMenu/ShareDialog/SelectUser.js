import { Avatar, CircularProgress, List, ListItem, ListItemText, Paper, TextField, withStyles } from '@material-ui/core';
import Downshift from 'downshift';
import React, { useEffect, useState } from 'react';

function Suggestions({ inputValue, findUsers, classes, getItemProps, highlightedIndex }) {
  const [{ users, loading, error }, setUsers] = useState({ loading: true });

  const loadOptions = async () => {
    if (inputValue === '') {
      setUsers({ users: [], loading: false, error: null });
      return;
    }

    setUsers({ users, loading: true, error: null });

    try {
      const users = await findUsers(inputValue);
      setUsers({ users, loading: false, error: null });
    } catch (error) {
      setUsers({ users: null, loading: false, error });
    }
  };

  useEffect(
    () => {
      loadOptions();
    },
    [inputValue]
  );

  return (
    <Paper className={classes.paper} square>
      {loading ? (
        <CircularProgress className={classes.progress} />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <List>
          {users.map((user, index) => (
            <ListItem key={user.id} selected={highlightedIndex === index} {...getItemProps({ item: user })}>
              <Avatar src={user.photoURL}>{user.label}</Avatar>
              <ListItemText inset primary={user.label} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}

function SelectUser({ value, findUsers, onChange, classes }) {
  return (
    <Downshift value={value} onChange={onChange} itemToString={user => (user ? user.label : '')}>
      {({ getInputProps, getItemProps, getMenuProps, highlightedIndex, inputValue, isOpen }) => (
        <div className={classes.container}>
          <TextField fullWidth placeholder="Select a user to share this song" InputProps={getInputProps()} />
          <div {...getMenuProps()}>
            {isOpen && (
              <Suggestions
                classes={classes}
                inputValue={inputValue}
                findUsers={findUsers}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
              />
            )}
          </div>
        </div>
      )}
    </Downshift>
  );
}

const styles = ({ spacing }) => ({
  container: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: spacing.unit,
    left: 0,
    right: 0,
  },
  progress: {
    margin: spacing.unit * 2,
  },
});

export default withStyles(styles)(SelectUser);
