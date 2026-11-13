import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const app = initializeApp(
  {
    apiKey: 'AIzaSyB6JZLHNPTfY9y4pGxAIozZYnLhvoFDR2Y',
    authDomain: 'songbook-pi.firebaseapp.com',
    databaseURL: 'https://songbook-pi.firebaseio.com',
    projectId: 'songbook-pi',
    storageBucket: 'songbook-pi.appspot.com',
    messagingSenderId: '328354743065',
  },
  // The app name is part of the persisted auth key; keep it so users stay signed in.
  'songbook'
);

export const auth = getAuth(app);

export const firestore = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

if (import.meta.env.VITE_FIREBASE_EMULATORS) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
}
