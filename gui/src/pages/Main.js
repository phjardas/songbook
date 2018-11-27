import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ContentUpdatedBanner from '../components/ContentUpdatedBanner';
import LayoutLoader from '../components/LayoutLoader';
import Notifications from '../components/Notifications';
import { withServiceWorker } from '../providers/ServiceWorker';

const CreateSong = lazy(async () => import('./CreateSong'));
const EditSong = lazy(async () => import('./EditSong'));
const Song = lazy(async () => import('./Song'));
const Songs = lazy(async () => import('./Songs'));

function Main({ contentUpdated }) {
  return (
    <Suspense fallback={<LayoutLoader />}>
      <Switch>
        <Route exact path="/songs" component={Songs} />
        <Route exact path="/songs/_new" component={CreateSong} />
        <Route exact path="/songs/:songId" component={Song} />
        <Route exact path="/songs/:songId/edit" component={EditSong} />

        <Route exact path="/drafts" component={Songs} />
        <Route exact path="/drafts/:songId" component={Song} />
        <Route exact path="/drafts/:songId/edit" component={EditSong} />

        <Route exact path="/">
          {() => <Redirect to="/songs" />}
        </Route>
      </Switch>
      <Notifications />
      {contentUpdated && <ContentUpdatedBanner />}
    </Suspense>
  );
}

export default withServiceWorker(Main);
