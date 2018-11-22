import React from 'react';
import { GlobalLoader } from './components/GlobalLoader';
import { withAuth } from './providers/Auth';

const MainLazy = React.lazy(() => import('./pages/Main'));
const SignInLazy = React.lazy(() => import('./pages/SignIn'));

function Page({ pending, user }) {
  if (pending) return <GlobalLoader />;
  return user ? <MainLazy /> : <SignInLazy />;
}

export default withAuth(Page);
