import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp(
  {
    apiKey: 'AIzaSyB6JZLHNPTfY9y4pGxAIozZYnLhvoFDR2Y',
    authDomain: 'songbook-pi.firebaseapp.com',
    databaseURL: 'https://songbook-pi.firebaseio.com',
    projectId: 'songbook-pi',
    storageBucket: 'songbook-pi.appspot.com',
    messagingSenderId: '328354743065',
  },
  'songbook'
);

export const firestore = app.firestore();
firestore.settings({ timestampsInSnapshots: true });
firestore.enablePersistence().catch(error => console.error('Error enabling Firestore offline persistence:', error));
