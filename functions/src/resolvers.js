import firebase from 'firebase-admin';
firebase.initializeApp();

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

async function getSongs() {
  const { docs } = await firestore.collection('songs').get();
  return docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

async function getSong(_, { id }) {
  const doc = await firestore
    .collection('songs')
    .doc(id)
    .get();
  if (doc.exists) return { ...doc.data(), id: doc.id };
}

export const resolvers = {
  Query: {
    songs: getSongs,
    song: getSong,
  },
};
