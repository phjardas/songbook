import type { LyricsLine, LyricsMessage, LyricsSection, ParsedLyrics } from '../types';

type ChordsLine = LyricsLine & { lines: number[]; parts: { chord?: string; text?: string; col: number }[] };

export default function parseOpenSong(lyrics: string): ParsedLyrics {
  const messages: LyricsMessage[] = [];
  const sections: LyricsSection[] = [];
  let section: LyricsSection | null = null;
  let chordsLine: ChordsLine | null = null;

  const lines = lyrics.split(/\r?\n/);
  let lineNo = 0;
  let emptyLines = 0;

  const startSection = ({ type, label, lineNo }: { type?: string; label?: string; lineNo?: number } = {}): LyricsSection => {
    if (lineNo !== undefined) endSection({ lineNo });
    chordsLine = null;
    return (section = { type, label, lines: [], firstLine: lineNo });
  };

  const endSection = ({ lineNo }: { lineNo: number }) => {
    if (section) {
      section.lastLine = lineNo - emptyLines - 1;
      sections.push(section);
      section = null;
    }
  };

  for (let l = lines.length; lineNo < l; lineNo++) {
    try {
      let line = lines[lineNo];

      if (line.startsWith('#')) {
        emptyLines++;
        continue;
      }

      if (!line.trim().length) {
        endSection({ lineNo });
        emptyLines++;
        continue;
      }

      if (line.startsWith('[')) {
        const { type, label } = parseSection(line.replace(/^\[(.+)\]$/, '$1'));
        startSection({ type, label, lineNo });
      } else if (line.startsWith('.')) {
        line = line.substring(1);
        const current = section ?? startSection({ lineNo });
        const parts = line.split(/(\S+)/);
        chordsLine = { lines: [lineNo], parts: [] };
        let col = 0;

        for (let i = 0; i < parts.length; i++) {
          const chord = parts[i];
          if (chord.trim() || (i === 0 && chord !== '')) {
            chordsLine.parts.push({
              chord: chord.trim() || undefined,
              col: col + 1,
            });
          }

          col += chord.length;
        }

        current.lines.push(chordsLine);
      } else if (line.startsWith(' ')) {
        line = line.substring(1);
        const current = section ?? startSection();
        if (chordsLine) {
          chordsLine.lines.push(lineNo);

          for (let i = 0; i < chordsLine.parts.length; i++) {
            const part = chordsLine.parts[i];
            const startIndex = part.col - 1;
            const endIndex = chordsLine.parts.length > i + 1 ? chordsLine.parts[i + 1].col - 1 : line.length;
            part.text = line.substring(startIndex, endIndex);
          }

          chordsLine = null;
        } else {
          current.lines.push({ lines: [lineNo], parts: [{ text: line, col: 1 }] });
        }
      } else {
        throw new Error('A line must either start with a space or a dot.');
      }
    } catch (error) {
      messages.push({ line: lineNo, type: 'error', message: (error as Error).message });
    }

    emptyLines = 0;
  }

  endSection({ lineNo });
  return { sections, messages };
}

function parseSection(type: string) {
  if (type === 'C') return { type: 'chorus', label: 'Chorus' };
  if (type === 'I') return { type: 'intro', label: 'Intro' };
  if (type === 'B') return { type: 'bridge', label: 'Bridge' };
  if (type === 'P') return { type: 'prechorus', label: 'Pre-Chorus' };
  if (type === 'O') return { type: 'outro', label: 'Outro' };
  if (type.match(/^V(\d+)$/)) return { type: 'verse', label: `Verse ${type.substring(1)}` };
  return { type, label: type };
}
