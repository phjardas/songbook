const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function registerServiceWorker(config) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      console.warn(
        'Skipping service worker registration because location %s does not match expected public URL %s',
        window.location.origin,
        publicUrl.origin
      );
      return;
    }

    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

    if (isLocalhost) {
      checkValidServiceWorker(swUrl, config);
    } else {
      registerValidSW(swUrl, config);
    }
  }
}

async function registerValidSW(swUrl, config) {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);

    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            console.info('Cache has been updated');
            if (config && config.onUpdate) config.onUpdate(registration);
          } else {
            console.info('Cache has been initialized');
            if (config && config.onSuccess) config.onSuccess(registration);
          }
        }
      };
    };
  } catch (error) {
    console.error('Error during service worker registration:', error);
  }
}

async function checkValidServiceWorker(swUrl, config) {
  try {
    const response = await fetch(swUrl);
    const contentType = response.headers.get('content-type');

    if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
      console.info('Unregistering invalid previous service worker');
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      window.location.reload();
    } else {
      registerValidSW(swUrl, config);
    }
  } catch (error) {
    console.warn('No internet connection found. App is running in offline mode:', error);
  }
}
