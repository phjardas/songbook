import { useNavigate } from 'react-router';
import CustomSnackbarContent from '../components/CustomSnackbarContent';
import LayoutError from '../components/LayoutError';
import LayoutLoader from '../components/LayoutLoader';
import Song from '../components/Song';
import { useNotifications } from '../providers/Notifications';
import { useSong } from '../providers/Song';

export default function SongPage() {
  const { loading, error, publishSong, unpublishSong, ...props } = useSong();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  if (loading) return <LayoutLoader />;
  if (error) return <LayoutError error={error} />;

  const moveSong = (move, message) => async () => {
    const moved = await move();
    navigate(moved.meta.url);
    addNotification({
      autoHideDuration: 3000,
      content: <CustomSnackbarContent message={message} variant="success" />,
    });
  };

  return (
    <Song
      {...props}
      publishSong={moveSong(publishSong, 'The song was published and removed from drafts.')}
      unpublishSong={moveSong(unpublishSong, 'The song was unpublished and moved to drafts.')}
    />
  );
}
