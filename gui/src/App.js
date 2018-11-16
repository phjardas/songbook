import { CssBaseline } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import purple from '@material-ui/core/colors/purple';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Loading from './components/Loading';
import ServiceWorker from './components/ServiceWorker';
// import ContentUpdatedBanner from './components/ContentUpdatedBanner';
import SmallLayout from './components/SmallLayout';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import { AuthProvider, WithAuth } from './providers/Auth';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: amber,
  },
});

export default function App() {
  return (
    <ServiceWorker>
      {({ contentUpdated }) => (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AuthProvider>
              <WithAuth>
                {({ pending, user }) => {
                  if (pending) {
                    return (
                      <SmallLayout title="Loading…">
                        <Loading />
                      </SmallLayout>
                    );
                  }

                  return user ? <Main /> : <SignIn />;
                }}
              </WithAuth>
            </AuthProvider>
          </Router>

          {/* contentUpdated && <ContentUpdatedBanner /> */}
        </MuiThemeProvider>
      )}
    </ServiceWorker>
  );
}
