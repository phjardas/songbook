import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { apollo } from './apollo';
import ScrollToTop from './components/ScrollToTop';
import Song from './pages/Song';
import Songs from './pages/Songs';
import './styles.scss';

export default function App() {
  return (
    <ApolloProvider client={apollo}>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/songs/:songId" component={Song} />
            <Route path="/songs" component={Songs} />
            <Route exact path="/">
              {() => <Redirect to="/songs" />}
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </ApolloProvider>
  );
}
