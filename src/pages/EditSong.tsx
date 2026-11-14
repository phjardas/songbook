import Layout from '../components/layout';
import LayoutError from '../components/LayoutError';
import LayoutLoader from '../components/LayoutLoader';
import SongEditor from '../components/SongEditor';
import { useSong } from '../providers/Song';

export default function EditSong() {
  const state = useSong();

  if (state.loading) return <LayoutLoader />;
  if (state.error) return <LayoutError error={state.error} />;
  const { song, saveSong } = state;

  return (
    <Layout title={song.title ? `Edit ${song.title}` : 'Edit song'} back={song.meta.url} maxWidth={1200}>
      <SongEditor song={song} saveSong={saveSong} />
    </Layout>
  );
}
