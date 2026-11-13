import { GlobalStyles } from '@mui/material';
import type { ComponentType, ReactNode } from 'react';
import type { ButtonLinkProps } from '../ButtonLink';
import { useIsDesktop } from '../../providers/Theme';
import DesktopLayout from './desktop/DesktopLayout';
import MobileLayout from './mobile/MobileLayout';

export interface LayoutProps {
  title?: string;
  back?: string;
  /** Floating action button; receives the MUI Fab component and styling props. */
  Fab?: ComponentType<Omit<ButtonLinkProps, 'to'>> | false;
  Actions?: ComponentType;
  children?: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const ResponsiveLayout = useIsDesktop() ? DesktopLayout : MobileLayout;

  return (
    <>
      <title>{props.title ? `${props.title} - Songbook` : 'Songbook'}</title>
      <GlobalStyles styles={theme => ({ body: { backgroundColor: theme.palette.background.paper } })} />
      <ResponsiveLayout {...props} />
    </>
  );
}
