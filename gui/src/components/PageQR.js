import React from 'react';
import { QRCode } from 'react-qr-svg';
import { withRouter } from 'react-router';

import styled from 'styled-components';

const QR = styled(QRCode)`
  width: 8rem;
  float: right;

  @media screen {
    display: none;
  }
`;

class PageQR extends React.Component {
  render() {
    return <QR bgColor="#FFFFFF" fgColor="#000000" level="L" value={window.location.href} />;
  }
}

export default withRouter(PageQR);
