import React from 'react';
import WithMenuItems from './WithMenuItems';

export default function MobileSongActions(props) {
  return <WithMenuItems {...props}>{({ items }) => items.map((Item, i) => <Item key={i} color="inherit" />)}</WithMenuItems>;
}
