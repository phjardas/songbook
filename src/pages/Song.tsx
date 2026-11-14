import { useNavigate } from 'react-router';
import LayoutError from '../components/LayoutError';
import LayoutLoader from '../components/LayoutLoader';
import Song from '../components/Song';
import { useNotifications } from '../providers/Notifications';
import { useSong } from '../providers/Song';
import type { Song as SongType } from '../types';

export default function SongPage() {
  const state = useSong();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  if (state.loading) return <LayoutLoader />;
  if (state.error) return <LayoutError error={state.error} />;

  const moveSong = (move: () => Promise<SongType>, message: string) => async () => {
    const moved = await move();
    navigate(moved.meta.url);
    addNotification({ message });
  };

  return (
    <Song
      song={state.song}
      doc={state.doc}
      publishSong={moveSong(state.publishSong, 'Song published')}
      unpublishSong={moveSong(state.unpublishSong, 'Song unpublished and moved to drafts')}
    />
  );
}
