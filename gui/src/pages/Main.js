import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ContentUpdatedBanner from '../components/ContentUpdatedBanner';
import Layout from '../components/Layout';
import Notifications from '../components/Notifications';
import { withServiceWorker } from '../providers/ServiceWorker';
import EditSong from './EditSong';
import Song from './Song';
import Songs from './Songs';

function Main({ contentUpdated }) {
  return (
    <Layout>
      <Switch>
        <Route path="/songs/:songId/edit" component={EditSong} />
        <Route path="/songs/:songId" component={Song} />
        <Route path="/songs" component={Songs} />
        <Route exact path="/">
          {() => <Redirect to="/songs" />}
        </Route>
      </Switch>
      <Notifications />
      {contentUpdated && <ContentUpdatedBanner />}
    </Layout>
  );
}

export default withServiceWorker(Main);
