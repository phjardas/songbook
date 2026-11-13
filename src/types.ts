export type LyricsType = 'chordpro' | 'opensong';

export interface LyricsPart {
  chord?: string;
  text?: string;
  col?: number;
}

export interface LyricsLine {
  /** Source line numbers this rendered line came from. */
  lines?: number[];
  parts: LyricsPart[];
}

export interface LyricsSection {
  type?: string;
  label?: string;
  lines: LyricsLine[];
  firstLine?: number;
  lastLine?: number;
}

export interface LyricsMessage {
  line: number;
  type: 'error' | 'warning';
  message: string;
}

export interface ParsedLyrics {
  sections: LyricsSection[];
  messages: LyricsMessage[];
}

export interface SongData {
  title: string;
  author: string;
  key: string;
  lyrics: string;
  lyricsType?: LyricsType;
  owner: string;
}

export interface Song extends SongData {
  id: string;
  meta: {
    draft: boolean;
    owned: boolean;
    url: string;
  };
}

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  label: string | null;
}
