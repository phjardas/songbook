import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useAuth } from './Auth';
import { getSongDocument } from './data';

export function useSong() {
  const { songId } = useParams();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const draft = pathname.startsWith('/drafts');
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    let cancelled = false;
    const doc = getSongDocument({ songId, draft, user });
    setState({ loading: true });
    doc.song.then(
      song => !cancelled && setState({ loading: false, error: null, ...doc, song }),
      error => !cancelled && setState({ loading: false, error, song: null })
    );
    return () => {
      cancelled = true;
    };
  }, [songId, draft, user]);

  return state;
}
