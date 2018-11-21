import { useEffect, useState } from 'react';
import { registerServiceWorker } from '../serviceWorker';

export default function ServiceWorker({ children }) {
  const [contentUpdated, setUpdated] = useState(false);

  useEffect(() => {
    registerServiceWorker({
      onUpdate: () => {
        console.info('Cached content has been updated.');
        setUpdated(true);
      },
    });
  }, []);

  return children({ contentUpdated });
}
