import { firestore } from '../firebase';

export function getSongsCollection({ path, user }) {
  const draft = path.startsWith('/drafts');
  const collection = draft
    ? firestore
        .collection('users')
        .doc(user.id)
        .collection('drafts')
    : firestore.collection('songs');

  return {
    draft,
    collection,
    toSong: toSong({ draft, user }),
  };
}

export function toSong({ draft, user }) {
  return doc => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };

    return {
      ...data,
      draft,
      owned: user && user.id === data.owner,
      url: `/${draft ? 'drafts' : 'songs'}/${data.id}`,
    };
  };
}
