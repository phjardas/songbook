import { Button, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { compose } from 'recompose';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import SmallLayout from '../components/SmallLayout';
import { withAuth } from '../providers/Auth';

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

function SignIn({ signIn, classes, ...auth }) {
  const [signingIn, setSigningIn] = useState();
  const [signInError, setSignInError] = useState();

  const doSignIn = async (...args) => {
    setSignInError(null);
    setSigningIn(true);

    try {
      await signIn(...args);
    } catch (error) {
      setSignInError(error);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <SmallLayout>
      {signingIn ? (
        <Loading message="Signing you in…" />
      ) : (
        <SignInForm {...auth} signIn={doSignIn} signInError={signInError} classes={classes} />
      )}
    </SmallLayout>
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

export default compose(
  withAuth,
  withStyles(styles)
)(SignIn);
