import { createContext, type ReactNode, useContext } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const Context = createContext({ contentUpdated: false, reload: () => {} });

export function ServiceWorkerProvider({ children }: { children: ReactNode }) {
  const {
    needRefresh: [contentUpdated],
    updateServiceWorker,
  } = useRegisterSW();

  return <Context value={{ contentUpdated, reload: () => updateServiceWorker(true) }}>{children}</Context>;
}

export const useServiceWorker = () => useContext(Context);
