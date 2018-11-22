import React from 'react';
import Loading from './Loading';
import SmallLayout from './SmallLayout';

export function GlobalLoader() {
  return (
    <SmallLayout title="Loading…">
      <Loading />
    </SmallLayout>
  );
}
