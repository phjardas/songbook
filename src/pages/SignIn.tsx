import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import SmallLayout from '../components/SmallLayout';
import { useAuth } from '../providers/Auth';

export default function SignIn() {
  const { providers, signIn } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<Error | null>(null);

  const doSignIn = async (providerId: string) => {
    setSignInError(null);
    setSigningIn(true);

    try {
      await signIn(providerId);
    } catch (error) {
      setSignInError(error as Error);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <SmallLayout>
      <Box sx={{ typography: 'body1', color: 'text.secondary', mb: 4, textWrap: 'balance' }}>
        Your leadsheets with lyrics and chords, in any key.
      </Box>
      {signingIn ? (
        <Loading message="Signing you in…" />
      ) : (
        <Stack spacing={1.5}>
          {providers.map(p => (
            <Button
              key={p.id}
              variant="outlined"
              size="large"
              startIcon={<Box component={p.icon} sx={{ width: 20, height: 20, fill: 'currentColor' }} />}
              onClick={() => doSignIn(p.id)}
              sx={{ minHeight: 48, color: 'm3.onSurface', borderColor: 'm3.outline' }}
            >
              Continue with {p.label}
            </Button>
          ))}
        </Stack>
      )}
      {signInError && <ErrorSnackbar error={signInError} />}
    </SmallLayout>
  );
}
