import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import ScrollToTop from '../components/ScrollToTop';
import EditSong from './EditSong';
import Song from './Song';
import Songs from './Songs';

export default function Main() {
  return (
    <ScrollToTop>
      <Switch>
        <Route path="/songs/:songId/edit" component={EditSong} />
        <Route path="/songs/:songId" component={Song} />
        <Route path="/songs" component={Songs} />
        <Route exact path="/">
          {() => <Redirect to="/songs" />}
        </Route>
      </Switch>
    </ScrollToTop>
  );
}
