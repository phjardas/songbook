import { GlobalStyles } from '@mui/material';
import { useIsDesktop } from '../../providers/Theme';
import DesktopLayout from './desktop/DesktopLayout';
import MobileLayout from './mobile/MobileLayout';

export default function Layout(props) {
  const ResponsiveLayout = useIsDesktop() ? DesktopLayout : MobileLayout;

  return (
    <>
      <title>{props.title ? `${props.title} - Songbook` : 'Songbook'}</title>
      <GlobalStyles styles={theme => ({ body: { backgroundColor: theme.palette.background.paper } })} />
      <ResponsiveLayout {...props} />
    </>
  );
}
