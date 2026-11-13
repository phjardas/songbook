import { lazy } from 'react';
import GlobalLoader from './components/GlobalLoader';
import { useAuth } from './providers/Auth';

const Main = lazy(() => import('./pages/Main'));
const SignIn = lazy(() => import('./pages/SignIn'));

export default function Page() {
  const { pending, user } = useAuth();
  if (pending) return <GlobalLoader />;
  return user ? <Main /> : <SignIn />;
}
