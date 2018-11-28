import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalLoader from './components/GlobalLoader';
import { AuthProvider } from './providers/Auth';
import { NotificationsProvider } from './providers/Notifications';
import { ServiceWorkerProvider } from './providers/ServiceWorker';
import { ThemeProvider } from './providers/Theme';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <Suspense fallback={<GlobalLoader />}>
        <ServiceWorkerProvider>
          <NotificationsProvider>
            <AuthProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </AuthProvider>
          </NotificationsProvider>
        </ServiceWorkerProvider>
      </Suspense>
    </ThemeProvider>
  );
}
