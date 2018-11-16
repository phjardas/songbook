import React from 'react';
import { QRCode } from 'react-qr-svg';

export default function PageQR(props) {
  return <QRCode bgColor="#FFFFFF" fgColor="#000000" level="L" value={window.location.href} {...props} />;
}
