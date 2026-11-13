import { Print as PrintIcon } from '@material-ui/icons';

export default function PrintMenuItem({ hideMenu, children }) {
  const onClick = () => {
    hideMenu && hideMenu();
    window.print();
  };

  return children({
    Icon: PrintIcon,
    label: 'Print',
    onClick,
  });
}
