import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContentUpdatedBanner from './components/ContentUpdatedBanner';
import ScrollToTop from './components/ScrollToTop';
import ServiceWorker from './components/ServiceWorker';
import EditSong from './pages/EditSong';
import Song from './pages/Song';
import Songs from './pages/Songs';
import './styles.scss';

export default function App() {
  return (
    <ServiceWorker>
      {({ contentUpdated }) => (
        <>
          <Router>
            <ScrollToTop>
              <Route>
                {({ location }) => (
                  <TransitionGroup component={null}>
                    <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                      <Switch location={location}>
                        <Route path="/songs/:songId/edit" component={EditSong} />
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
          {contentUpdated && <ContentUpdatedBanner />}
        </>
      )}
    </ServiceWorker>
  );
}
