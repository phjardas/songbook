import { useNavigate } from 'react-router';
import CustomSnackbarContent from '../components/CustomSnackbarContent';
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
    addNotification({
      autoHideDuration: 3000,
      content: <CustomSnackbarContent message={message} variant="success" />,
    });
  };

  return (
    <Song
      song={state.song}
      doc={state.doc}
      publishSong={moveSong(state.publishSong, 'The song was published and removed from drafts.')}
      unpublishSong={moveSong(state.unpublishSong, 'The song was unpublished and moved to drafts.')}
    />
  );
}
