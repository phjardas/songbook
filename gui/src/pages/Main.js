import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ContentUpdatedBanner from '../components/ContentUpdatedBanner';
import Notifications from '../components/Notifications';
import { withServiceWorker } from '../providers/ServiceWorker';
import CreateSong from './CreateSong';
import EditSong from './EditSong';
import Song from './Song';
import Songs from './Songs';

function Main({ contentUpdated }) {
  return (
    <>
      <Switch>
        <Route exact path="/songs" component={Songs} />
        <Route path="/songs/_new" component={CreateSong} />
        <Route exact path="/songs/:songId" component={Song} />
        <Route path="/songs/:songId/edit" component={EditSong} />

        <Route exact path="/drafts" component={Songs} />
        <Route path="/drafts/:songId" component={EditSong} />

        <Route exact path="/">
          {() => <Redirect to="/songs" />}
        </Route>
      </Switch>
      <Notifications />
      {contentUpdated && <ContentUpdatedBanner />}
    </>
  );
}

export default withServiceWorker(Main);
