import { collection, deleteDoc, doc as docRef, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

function getDraftsCollection(user) {
  return collection(firestore, 'users', user.id, 'drafts');
}

function getPublicCollection() {
  return collection(firestore, 'songs');
}

export function getSongsCollection({ draft, user }) {

  return {
    draft,
    collection: draft ? getDraftsCollection(user) : getPublicCollection(),
    toSong: toSongFactory({ draft, user }),
  };
}

export function getSongDocument({ songId, draft, user }) {
  const { collection, toSong } = getSongsCollection({ draft, user });
  const doc = docRef(collection, songId);
  let song;
  const getSong = () => {
    if (!song) {
      song = getDoc(doc).then(snapshot => {
        if (!snapshot.exists()) throw new Error('Song not found');
        return toSong(snapshot);
      });
    }
    return song;
  };

  return {
    draft,
    doc,
    get song() {
      return getSong();
    },
    saveSong: data => updateDoc(doc, data),
    publishSong: async () => {
      const { id, meta, ...data } = await getSong();
      if (!meta.draft) throw new Error('Cannot publish a public song');
      await setDoc(docRef(getPublicCollection(), id), data);
      await deleteDoc(doc);
      return { id, ...data, meta: { ...meta, draft: false, url: `/songs/${id}` } };
    },
    unpublishSong: async () => {
      const { id, meta, ...data } = await getSong();
      if (meta.draft) throw new Error('Cannot unpublish a draft song');
      await setDoc(docRef(getDraftsCollection(user), id), data);
      await deleteDoc(doc);
      return { id, ...data, meta: { ...meta, draft: true, url: `/drafts/${id}` } };
    },
  };
}

function toSongFactory({ draft, user }) {
  return doc => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };

    return {
      ...data,
      meta: {
        draft,
        owned: user?.id === data.owner,
        url: `/${draft ? 'drafts' : 'songs'}/${data.id}`,
      },
    };
  };
}
