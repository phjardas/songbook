import { Close as CloseIcon } from '@mui/icons-material';
import { AppBar, Box, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material';

function SlideUp(props) {
  return <Slide direction="up" {...props} />;
}

export default function FullScreenDialog({ children, title, hide, ...props }) {
  return (
    <Dialog onClose={hide} {...props} fullScreen slots={{ transition: SlideUp }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={hide} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>{children}</Box>
    </Dialog>
  );
}
