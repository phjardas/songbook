import React from 'react';
import ScrollToTop from './components/ScrollToTop';
import Page from './Page';
import Providers from './Providers';

export default function App() {
  return (
    <Providers>
      <ScrollToTop>
        <Page />
      </ScrollToTop>
    </Providers>
  );
}
