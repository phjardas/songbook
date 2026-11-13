import { ArrowBack as ArrowBackIcon, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, Fab as MuiFab, IconButton, SwipeableDrawer, Toolbar, Zoom } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../ButtonLink';
import Footer from '../Footer';
import MainMenuList from '../MainMenuList';

export default function MobileLayout({ Fab, Actions, back, title, children }) {
  const [appBarElevation, setAppBarElevation] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setAppBarElevation(window.scrollY > 0 ? 4 : 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <SwipeableDrawer open={drawerOpen} onClose={closeDrawer} onOpen={openDrawer}>
        <MainMenuList onNavigate={closeDrawer} userHeight={56} sx={{ width: 240 }} />
      </SwipeableDrawer>

      <AppBar
        position="sticky"
        elevation={appBarElevation}
        sx={theme => ({
          transition: theme.transitions.create('box-shadow'),
          '@media print': { display: 'none' },
        })}
      >
        <Toolbar>
          {back ? (
            <ButtonLink Component={IconButton} to={back} color="inherit" edge="start" aria-label="Back">
              <ArrowBackIcon />
            </ButtonLink>
          ) : (
            <IconButton color="inherit" onClick={openDrawer} edge="start" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          )}

          <Box
            component={Link}
            to={back || '/'}
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              typography: 'h6',
              color: 'inherit',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title || 'Songbook'}
          </Box>

          {Actions && <Actions />}

          {Fab && (
            <Box key={title} sx={{ position: 'fixed', bottom: 16, right: 16, '@media print': { display: 'none' } }}>
              <Zoom in>
                <Fab Component={MuiFab} color="secondary" />
              </Zoom>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <main>{children}</main>

      <Footer />
    </>
  );
}
