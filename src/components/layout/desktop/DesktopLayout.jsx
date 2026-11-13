import { AppBar, Box, Drawer, Fab, Toolbar } from '@mui/material';
import CreateSongButton from '../../CreateSongButton';
import Footer from '../Footer';
import MainMenuList from '../MainMenuList';
import Title from './Title';

const drawerWidth = 256;
const noPrint = { '@media print': { display: 'none' } };

export default function DesktopLayout({ children }) {
  return (
    <>
      <Drawer
        open
        variant="permanent"
        slotProps={{ paper: { sx: { mt: '65px', height: 'calc(100% - 65px)', ...noPrint } } }}
      >
        <Box sx={{ width: drawerWidth, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <CreateSongButton
            Component={Fab}
            variant="extended"
            withLabel
            iconSx={{ mr: 1, color: 'primary.main' }}
            sx={{
              m: 1,
              bgcolor: 'background.paper',
              color: 'text.primary',
              textTransform: 'none',
              letterSpacing: 0.25,
              boxShadow: 1,
              '&:hover': { bgcolor: 'background.paper', boxShadow: 4 },
            }}
          />
          <MainMenuList userHeight={64} sx={{ flex: 1, width: '100%' }} />
          <Footer />
        </Box>
      </Drawer>

      <AppBar
        elevation={0}
        sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: 1, borderColor: 'divider', ...noPrint }}
      >
        <Toolbar>
          <Title />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ ml: `${drawerWidth}px`, mt: '65px', '@media print': { m: 0 } }}>
        {children}
      </Box>
    </>
  );
}
