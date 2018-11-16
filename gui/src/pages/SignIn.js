import { Button, withStyles } from '@material-ui/core';
import * as React from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import SmallLayout from '../components/SmallLayout';
import { WithAuth } from '../providers/Auth';

function SignInForm({ providers, signIn, signInError, classes }) {
  return (
    <>
      <div className={classes.please}>Please sign in</div>
      {signInError && <ErrorSnackbar error={signInError} />}
      <div className={classes.buttons}>
        {providers.map(p => (
          <Button key={p.id} variant="contained" color="primary" className={classes.signInButton} onClick={() => signIn(p.id)}>
            <p.icon className={classes.signInIcon} /> {p.label}
          </Button>
        ))}
      </div>
    </>
  );
}

function SignIn({ classes }) {
  return (
    <WithAuth>
      {auth => (
        <SmallLayout>{auth.signingIn ? <Loading message="Signing you in…" /> : <SignInForm {...auth} classes={classes} />}</SmallLayout>
      )}
    </WithAuth>
  );
}

const styles = ({ spacing, palette, typography }) => ({
  please: {
    textAlign: 'center',
    ...typography.body1,
  },
  buttons: {
    marginTop: spacing.unit,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  signInButton: {
    flex: 1,
    marginRight: spacing.unit,
    '&:last-child': {
      marginRight: 0,
    },
  },
  signInIcon: {
    marginRight: spacing.unit,
    height: '1.5em',
    fill: palette.common.white,
  },
});

export default withStyles(styles)(SignIn);
