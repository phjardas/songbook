import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalLoader from './components/GlobalLoader';
import { AuthProvider } from './providers/Auth';
import { NotificationsProvider } from './providers/Notifications';
import { ServiceWorkerProvider } from './providers/ServiceWorker';
import { theme } from './theme';

export default function Providers({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<GlobalLoader />}>
        <ServiceWorkerProvider>
          <NotificationsProvider>
            <AuthProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </AuthProvider>
          </NotificationsProvider>
        </ServiceWorkerProvider>
      </Suspense>
    </MuiThemeProvider>
  );
}
