import { createContext, useContext } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const Context = createContext();

export function ServiceWorkerProvider({ children }) {
  const {
    needRefresh: [contentUpdated],
    updateServiceWorker,
  } = useRegisterSW();

  return <Context value={{ contentUpdated, reload: () => updateServiceWorker(true) }}>{children}</Context>;
}

export const useServiceWorker = () => useContext(Context);
