import {
  CloudOff as UnpublishIcon,
  CloudUpload as PublishIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  SwapVert as SwapVertIcon,
} from '@mui/icons-material';
import { CircularProgress, type SvgIconProps } from '@mui/material';
import type { DocumentReference } from 'firebase/firestore';
import { type ComponentType, useState } from 'react';
import { useNavigate } from 'react-router';
import DeleteDialog from './DeleteDialog';
import TransposeDialog from './TransposeDialog';
import type { Song, SongData } from '../../types';

export interface SongActions {
  song: Song;
  doc: DocumentReference<SongData>;
  publishSong: () => Promise<void>;
  unpublishSong: () => Promise<void>;
}

export interface MenuItem {
  Icon: ComponentType<SvgIconProps>;
  label: string;
  onClick: () => void;
}

const Progress = () => <CircularProgress color="secondary" size="1em" />;

export default function useMenuItems({
  song,
  doc,
  publishSong,
  unpublishSong,
  transposedKey,
  onKeyChange,
}: SongActions & { transposedKey: string; onKeyChange: (key: string) => void }) {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<'transpose' | 'delete' | null>(null);
  const [pending, setPending] = useState(false);
  const { owned, draft, url } = song.meta;
  const hide = () => setDialog(null);

  const run = (action: () => Promise<void>) => async () => {
    setPending(true);
    try {
      await action();
    } finally {
      setPending(false);
    }
  };

  const share = () => navigator.share({ title: 'Songbook', text: `${song.title} by ${song.author}`, url: window.location.href });

  const items: MenuItem[] = [
    owned && { Icon: EditIcon, label: 'Edit', onClick: () => navigate(`${url}/edit`) },
    song.key && { Icon: SwapVertIcon, label: 'Transpose', onClick: () => setDialog('transpose') },
    { Icon: PrintIcon, label: 'Print', onClick: () => window.print() },
    'share' in navigator && { Icon: ShareIcon, label: 'Share', onClick: share },
    owned && draft && { Icon: pending ? Progress : PublishIcon, label: 'Publish', onClick: run(publishSong) },
    owned && !draft && { Icon: pending ? Progress : UnpublishIcon, label: 'Unpublish', onClick: run(unpublishSong) },
    owned && { Icon: DeleteIcon, label: 'Delete', onClick: () => setDialog('delete') },
  ].filter(item => !!item);

  const dialogs = (
    <>
      {song.key && (
        <TransposeDialog
          open={dialog === 'transpose'}
          hide={hide}
          originalKey={song.key}
          transposedKey={transposedKey}
          onKeyChange={onKeyChange}
        />
      )}
      {owned && <DeleteDialog open={dialog === 'delete'} hide={hide} song={song} doc={doc} />}
    </>
  );

  return { items, dialogs };
}
