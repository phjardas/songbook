import { Grid, withStyles } from '@material-ui/core';
import { Share as ShareIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { firestore } from '../../../firebase';
import ErrorSnackbar from '../../ErrorSnackbar';
import SaveButton from '../../SaveButton';
import SelectUser from './SelectUser';

function ShareUser({ ownerId, sharedUserIds, shareUser, classes }) {
  const [user, setUser] = useState();
  const [{ pending, error, shared }, setState] = useState({});

  const search = async query => {
    const { docs } = await firestore.collection('users').get();
    query = query.toLowerCase();
    return docs
      .filter(doc => doc.id !== ownerId && sharedUserIds.indexOf(doc.id) < 0)
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .filter(user => user.label.toLowerCase().indexOf(query) >= 0);
  };

  const submit = async e => {
    e.preventDefault();
    try {
      setState({ pending: true, error: null, shared: null });
      await shareUser(user.id);
      setState({ pending: false, error: null, shared: user });
      setUser(null);
    } catch (error) {
      setState({ pending: false, error, shared: null });
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submit}>
        <Grid container spacing={24} justify="space-between">
          <Grid item className={classes.input}>
            <SelectUser value={user} findUsers={search} onChange={setUser} disabled={pending} />
          </Grid>
          <Grid item>
            <SaveButton
              saving={pending}
              saved={!!shared}
              valid={!!user}
              color="primary"
              variant="text"
              titles={{ save: 'Share', saving: 'Sharing', saved: 'Shared' }}
              icons={{ save: ShareIcon }}
            />
          </Grid>
        </Grid>
      </form>
      {error && <ErrorSnackbar error={error} />}
    </div>
  );
}

const styles = ({ spacing }) => ({
  container: {
    marginTop: spacing.unit * 2,
  },
  input: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(ShareUser);
