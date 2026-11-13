import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { withConsumer } from './with';

const Context = React.createContext();

export function ServiceWorkerProvider({ children }) {
  const {
    needRefresh: [contentUpdated],
    updateServiceWorker,
  } = useRegisterSW();

  return <Context.Provider value={{ contentUpdated, reload: () => updateServiceWorker(true) }}>{children}</Context.Provider>;
}

export const WithServiceWorker = Context.Consumer;
export const withServiceWorker = withConsumer(WithServiceWorker);
