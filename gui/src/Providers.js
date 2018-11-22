import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalLoader } from './components/GlobalLoader';
import { AuthProvider } from './providers/Auth';
import { NotificationsProvider } from './providers/Notifications';
import { PageDataProvider } from './providers/PageData';
import { ServiceWorkerProvider } from './providers/ServiceWorker';
import { theme } from './theme';

export default function Providers({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<GlobalLoader />}>
        <ServiceWorkerProvider>
          <NotificationsProvider>
            <PageDataProvider>
              <AuthProvider>
                <Router>{children}</Router>
              </AuthProvider>
            </PageDataProvider>
          </NotificationsProvider>
        </ServiceWorkerProvider>
      </Suspense>
    </MuiThemeProvider>
  );
}
