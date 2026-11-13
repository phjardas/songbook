import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import type { Song } from '../types';
import { useUser } from './Auth';
import { getSongDocument, type SongDocument } from './data';

export type SongState =
  | { loading: true; error?: undefined }
  | { loading: false; error: Error }
  | ({ loading: false; error?: undefined; song: Song } & Omit<SongDocument, 'song'>);

export function useSong(): SongState {
  const { songId = '' } = useParams();
  const { pathname } = useLocation();
  const user = useUser();
  const draft = pathname.startsWith('/drafts');
  // Results are tagged with the request they belong to, so a stale result reads as loading.
  const request = `${user.id}:${draft}:${songId}`;
  const [result, setResult] = useState<{ request: string; state: SongState }>();

  useEffect(() => {
    let cancelled = false;
    const doc = getSongDocument({ songId, draft, user });
    doc.song.then(
      song => !cancelled && setResult({ request, state: { ...doc, loading: false, song } }),
      (error: Error) => !cancelled && setResult({ request, state: { loading: false, error } })
    );
    return () => {
      cancelled = true;
    };
  }, [request, songId, draft, user]);

  return result?.request === request ? result.state : { loading: true };
}
