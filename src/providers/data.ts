import {
  collection,
  type CollectionReference,
  deleteDoc,
  doc as docRef,
  type DocumentReference,
  type DocumentSnapshot,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import type { Song, SongData, User } from '../types';

function getDraftsCollection(user: User) {
  return collection(firestore, 'users', user.id, 'drafts') as CollectionReference<SongData>;
}

function getPublicCollection() {
  return collection(firestore, 'songs') as CollectionReference<SongData>;
}

export function getSongsCollection({ draft, user }: { draft: boolean; user: User }) {
  return {
    collection: draft ? getDraftsCollection(user) : getPublicCollection(),
    toSong: toSongFactory({ draft, user }),
  };
}

export interface SongDocument {
  draft: boolean;
  doc: DocumentReference<SongData>;
  song: Promise<Song>;
  saveSong: (data: Partial<SongData>) => Promise<void>;
  publishSong: () => Promise<Song>;
  unpublishSong: () => Promise<Song>;
}

export function getSongDocument({ songId, draft, user }: { songId: string; draft: boolean; user: User }): SongDocument {
  const { collection, toSong } = getSongsCollection({ draft, user });
  const doc = docRef(collection, songId);
  let song: Promise<Song> | undefined;
  const getSong = () =>
    (song ??= getDoc(doc).then(snapshot => {
      if (!snapshot.exists()) throw new Error('Song not found');
      return toSong(snapshot);
    }));

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

function toSongFactory({ draft, user }: { draft: boolean; user: User }) {
  return (doc: DocumentSnapshot<SongData>): Song => {
    const data = { ...(doc.data() as SongData), id: doc.id };

    return {
      ...data,
      meta: {
        draft,
        owned: user.id === data.owner,
        url: `/${draft ? 'drafts' : 'songs'}/${data.id}`,
      },
    };
  };
}
