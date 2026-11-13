import React from 'react';
import Loading from './Loading';
import SmallLayout from './SmallLayout';

export default function GlobalLoader() {
  return (
    <SmallLayout title="Loading…">
      <Loading />
    </SmallLayout>
  );
}
