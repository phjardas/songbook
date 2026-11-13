import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import ContentUpdatedBanner from '../components/ContentUpdatedBanner';
import LayoutLoader from '../components/LayoutLoader';
import Notifications from '../components/Notifications';
import { useServiceWorker } from '../providers/ServiceWorker';

const CreateSong = lazy(() => import('./CreateSong'));
const EditSong = lazy(() => import('./EditSong'));
const Song = lazy(() => import('./Song'));
const Songs = lazy(() => import('./Songs'));

export default function Main() {
  const { contentUpdated, reload } = useServiceWorker();

  return (
    <Suspense fallback={<LayoutLoader />}>
      <Routes>
        <Route path="/songs" element={<Songs />} />
        <Route path="/songs/_new" element={<CreateSong />} />
        <Route path="/songs/:songId" element={<Song />} />
        <Route path="/songs/:songId/edit" element={<EditSong />} />

        <Route path="/drafts" element={<Songs draft />} />
        <Route path="/drafts/:songId" element={<Song />} />
        <Route path="/drafts/:songId/edit" element={<EditSong />} />

        <Route path="*" element={<Navigate to="/songs" replace />} />
      </Routes>
      <Notifications />
      {contentUpdated && <ContentUpdatedBanner reload={reload} />}
    </Suspense>
  );
}
