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
  const [state, setState] = useState<SongState>({ loading: true });

  useEffect(() => {
    let cancelled = false;
    const doc = getSongDocument({ songId, draft, user });
    setState({ loading: true });
    doc.song.then(
      song => !cancelled && setState({ ...doc, loading: false, song }),
      (error: Error) => !cancelled && setState({ loading: false, error })
    );
    return () => {
      cancelled = true;
    };
  }, [songId, draft, user]);

  return state;
}
