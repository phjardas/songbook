import { firestore } from '../firebase';

function getDraftsCollection(user) {
  return firestore
    .collection('users')
    .doc(user.id)
    .collection('drafts');
}

function getPublicCollection() {
  return firestore.collection('songs');
}

export function getSongsCollection({ path, user }) {
  const draft = path.startsWith('/drafts');
  const collection = draft ? getDraftsCollection(user) : getPublicCollection();

  return {
    draft,
    collection,
    toSong: toSongFactory({ draft, user }),
  };
}

export function getSongDocument({ songId, path, user }) {
  const { draft, collection, toSong } = getSongsCollection({ path, user });
  const doc = collection.doc(songId);
  let song;
  const getSong = () => {
    if (!song) {
      song = doc.get().then(snapshot => {
        if (!snapshot.exists) throw new Error('Song not found');
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
    saveSong: data => doc.update(data),
    publishSong: async () => {
      const { id, meta, ...data } = await getSong();
      if (!meta.draft) throw new Error('Cannot publish a public song');
      await getPublicCollection()
        .doc(id)
        .set(data);
      await doc.delete();
      return { id, ...data, meta: { ...meta, draft: false, url: `/songs/${id}` } };
    },
    unpublishSong: async () => {
      const { id, meta, ...data } = await getSong();
      if (meta.draft) throw new Error('Cannot unpublish a draft song');
      await getDraftsCollection(user)
        .doc(id)
        .set(data);
      await doc.delete();
      return { id, ...data, meta: { ...meta, draft: false, url: `/drafts/${id}` } };
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
        owned: user && user.id === data.owner,
        url: `/${draft ? 'drafts' : 'songs'}/${data.id}`,
      },
    };
  };
}
