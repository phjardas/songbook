import firebase from 'firebase-admin';
import serviceAccount from '../firebase-service-account.json';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
