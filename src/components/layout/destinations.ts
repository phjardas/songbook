import { EditNote, EditNoteOutlined, LibraryMusic, LibraryMusicOutlined } from '@mui/icons-material';

export const destinations = [
  { to: '/songs', label: 'Songs', Icon: LibraryMusicOutlined, ActiveIcon: LibraryMusic },
  { to: '/drafts', label: 'Drafts', Icon: EditNoteOutlined, ActiveIcon: EditNote },
];
