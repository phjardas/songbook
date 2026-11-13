import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import SmallLayout from '../components/SmallLayout';
import { useAuth } from '../providers/Auth';

export default function SignIn() {
  const { providers, signIn } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState(null);

  const doSignIn = async providerId => {
    setSignInError(null);
    setSigningIn(true);

    try {
      await signIn(providerId);
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
        <>
          <Box sx={{ textAlign: 'center', typography: 'body1' }}>Please sign in</Box>
          {signInError && <ErrorSnackbar error={signInError} />}
          <Stack direction="row" spacing={1} sx={{ mt: 1, width: '100%' }}>
            {providers.map(p => (
              <Button
                key={p.id}
                variant="contained"
                color="primary"
                sx={{ flex: 1 }}
                startIcon={<Box component={p.icon} sx={{ height: '1.5em', fill: 'white' }} />}
                onClick={() => doSignIn(p.id)}
              >
                {p.label}
              </Button>
            ))}
          </Stack>
        </>
      )}
    </SmallLayout>
  );
}
