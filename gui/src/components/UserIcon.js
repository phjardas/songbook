import React from 'react';

import styled from 'styled-components';

const Photo = styled.img`
  display: inline-block;
  margin-top: -2.5rem;
  margin-bottom: -2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default function UserIcon({ user: { photoURL }, ...rest }) {
  if (!photoURL) return null;
  return <Photo src={photoURL} {...rest} />;
}
