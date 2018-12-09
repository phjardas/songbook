export default function parseOpenSong(lyrics) {
  const messages = [];
  const sections = [];
  let section;
  let chordsLine;

  const lines = lyrics.split(/\r?\n/);
  let lineNo = 0;
  let emptyLines = 0;

  const startSection = ({ type, label, lineNo } = {}) => {
    endSection({ lineNo });
    section = { type, label, lines: [], firstLine: lineNo };
    chordsLine = null;
  };

  const endSection = ({ lineNo }) => {
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
        if (!section) startSection({ lineNo });
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

        section.lines.push(chordsLine);
      } else if (line.startsWith(' ')) {
        line = line.substring(1);
        if (!section) startSection();
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
          section.lines.push({ lines: [lineNo], parts: [{ text: line, col: 1 }] });
        }
      } else {
        throw new Error('A line must either start with a space or a dot.');
      }
    } catch (error) {
      messages.push({ line: lineNo, type: 'error', message: error.message });
    }

    emptyLines = 0;
  }

  endSection({ lineNo });
  return { sections, messages };
}

function parseSection(type) {
  if (type === 'C') return { type: 'chorus', label: 'Chorus' };
  if (type === 'I') return { type: 'intro', label: 'Intro' };
  if (type === 'B') return { type: 'bridge', label: 'Bridge' };
  if (type === 'P') return { type: 'prechorus', label: 'Pre-Chorus' };
  if (type === 'O') return { type: 'outro', label: 'Outro' };
  if (type.match(/^V(\d+)$/)) return { type: 'verse', label: `Verse ${type.substring(1)}` };
  return { type, label: type };
}
