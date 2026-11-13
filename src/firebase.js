import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export { Firebase };

const firebase = Firebase.initializeApp(
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

export const auth = firebase.auth();

export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
firestore.enablePersistence().catch(error => console.error('Error enabling Firestore offline persistence:', error));
