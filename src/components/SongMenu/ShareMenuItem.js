import { Share as ShareIcon } from '@material-ui/icons';

export default function ShareMenuItem({ song, hideMenu, children }) {
  if (!navigator.share) return children();

  const onClick = () => {
    hideMenu && hideMenu();
    navigator.share({
      title: 'Songbook',
      text: `${song.title} by ${song.author}`,
      url: window.location.href,
    });
  };

  return children({
    Icon: ShareIcon,
    label: 'Share',
    onClick,
  });
}
