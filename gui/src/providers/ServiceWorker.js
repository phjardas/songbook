import React, { useEffect, useState } from 'react';
import { registerServiceWorker } from '../serviceWorker';
import { withConsumer } from './with';

const Context = React.createContext();

export function ServiceWorkerProvider({ children }) {
  const [contentUpdated, setUpdated] = useState(false);

  useEffect(() => {
    registerServiceWorker({
      onUpdate: () => setUpdated(true),
    });
  }, []);

  return <Context.Provider value={{ contentUpdated }}>{children}</Context.Provider>;
}

export const WithServiceWorker = Context.Consumer;
export const withServiceWorker = withConsumer(WithServiceWorker);
