import React, { useEffect, useState } from 'react';
import { registerServiceWorker } from '../serviceWorker';
import { withConsumer } from './with';

const Context = React.createContext();

export function ServiceWorkerProvider({ children }) {
  const [contentUpdated, setUpdated] = useState(false);

  useEffect(() => {
    registerServiceWorker({
      onSuccess: () => console.info('Content is cached for offline use.'),
      onUpdate: () => setUpdated(true),
    });
  }, []);

  console.log({ contentUpdated });

  return <Context.Provider value={{ contentUpdated }}>{children}</Context.Provider>;
}

export const WithServiceWorker = Context.Consumer;
export const withServiceWorker = withConsumer(WithServiceWorker);
