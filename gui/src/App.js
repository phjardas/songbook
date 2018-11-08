import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ContentUpdatedBanner from './components/ContentUpdatedBanner';
import Layout from './components/Layout';
import Loading from './components/Loading';
import PaddedContent from './components/PaddedContent';
import ServiceWorker from './components/ServiceWorker';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import { AuthProvider, WithAuth } from './providers/Auth';
import './styles.scss';

export default function App() {
  return (
    <ServiceWorker>
      {({ contentUpdated }) => (
        <>
          <Router>
            <AuthProvider>
              <WithAuth>
                {({ pending, user }) => {
                  if (pending)
                    return (
                      <Layout title="Loading…">
                        <PaddedContent>
                          <Loading />
                        </PaddedContent>
                      </Layout>
                    );
                  if (user) return <Main />;
                  return <SignIn />;
                }}
              </WithAuth>
            </AuthProvider>
          </Router>

          {contentUpdated && <ContentUpdatedBanner />}
        </>
      )}
    </ServiceWorker>
  );
}
