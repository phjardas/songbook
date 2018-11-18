import { useEffect, useState } from 'react';
import * as serviceWorker from '../serviceWorker';

export default function ServiceWorker({ children }) {
  const [contentUpdated, setUpdated] = useState(false);

  useEffect(() => {
    serviceWorker.register({
      onUpdate: () => {
        console.info('Cached content has been updated.');
        setUpdated(true);
      },
    });
  });

  return children({ contentUpdated });
}
