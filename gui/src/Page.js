import React from 'react';
import GlobalLoader from './components/GlobalLoader';
import { withAuth } from './providers/Auth';

const Main = React.lazy(() => import('./pages/Main'));
const SignIn = React.lazy(() => import('./pages/SignIn'));

function Page({ pending, user }) {
  if (pending) return <GlobalLoader />;
  return user ? <Main /> : <SignIn />;
}

export default withAuth(Page);
