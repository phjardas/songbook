export default function parseOpenSong(lyrics) {
  const messages = [];
  const sections = [];
  let section;
  let chordsLine;

  const startSection = ({ type, label } = {}) => {
    if (section) sections.push(section);
    section = { type, label, lines: [] };
    chordsLine = null;
  };

  const lines = lyrics.split(/(\r|\n|\r\n)/);

  for (let lineNo = 0, l = lines.length; lineNo < l; lineNo++) {
    try {
      let line = lines[lineNo];
      if (line.startsWith('#') || !line.trim().length) continue;

      if (line.startsWith('[')) {
        const { type, label } = parseSection(line.replace(/^\[(.+)\]$/, '$1'));
        startSection({ type, label });
      } else if (line.startsWith('.')) {
        line = line.substring(1);
        if (!section) startSection();
        const parts = line.split(/(\S+)/);
        chordsLine = [];
        let col = 0;

        parts.forEach((chord, i) => {
          if (chord.trim() || (i === 0 && chord !== '')) {
            chordsLine.push({
              chord: chord.trim() || undefined,
              col,
            });
          }

          col += chord.length;
        });
        section.lines.push(chordsLine);
      } else if (line.startsWith(' ')) {
        line = line.substring(1);
        if (!section) startSection();
        if (chordsLine) {
          chordsLine.forEach((part, i) => {
            part.text = line.substring(part.col, chordsLine.length > i + 1 ? chordsLine[i + 1].col : line.length);
          });
          chordsLine = null;
        } else {
          section.lines.push([{ text: line, col: 0 }]);
        }
      } else {
        throw new Error('A line must either start with a space or a dot.');
      }
    } catch (error) {
      messages.push({ line: lineNo, type: 'error', message: error.message });
    }
  }

  if (section) sections.push(section);
  return { sections, messages };
}

function parseSection(type) {
  if (type === 'C') return { type: 'chorus', label: 'Chorus' };
  if (type === 'I') return { type: 'intro', label: 'Intro' };
  if (type === 'B') return { type: 'bridge', label: 'Bridge' };
  if (type.match(/^V(\d+)$/)) return { type: 'verse', label: `Verse ${type.substring(1)}` };
  return { type, label: type };
}
