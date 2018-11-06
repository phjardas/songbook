import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollToTop from './components/ScrollToTop';
import Song from './pages/Song';
import Songs from './pages/Songs';
import './styles.scss';

export default function App() {
  return (
    <Router>
      <ScrollToTop>
        <Route>
          {({ location }) => (
            <TransitionGroup component={null}>
              <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Switch location={location}>
                  <Route path="/songs/:songId" component={Song} />
                  <Route path="/songs" component={Songs} />
                  <Route exact path="/">
                    {() => <Redirect to="/songs" />}
                  </Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        </Route>
      </ScrollToTop>
    </Router>
  );
}
