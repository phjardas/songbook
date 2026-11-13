import Layout from '../components/layout';
import LayoutError from '../components/LayoutError';
import LayoutLoader from '../components/LayoutLoader';
import SongEditor from '../components/SongEditor';
import { useSong } from '../providers/Song';

export default function EditSong() {
  const { loading, error, song, saveSong } = useSong();

  if (loading) return <LayoutLoader />;
  if (error) return <LayoutError error={error} />;

  return (
    <Layout title={song.title} back={song.meta.url}>
      <SongEditor song={song} saveSong={saveSong} sx={{ p: 3 }} />
    </Layout>
  );
}
