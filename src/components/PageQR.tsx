import { Box } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

export default function PageQR() {
  return (
    <Box sx={{ float: 'right', width: 96, height: 96, m: 3, '@media screen': { display: 'none' } }}>
      <QRCodeSVG value={window.location.href} level="L" bgColor="#FFFFFF" fgColor="#000000" size={96} />
    </Box>
  );
}
