export default function parseChordPro(lyrics) {
  const messages = [];
  const lines = lyrics.split(/(\r|\n|\r\n)/);
  const sections = [];
  let section;

  const handleDirective = (directive, lineNo) => {
    const match = directive.match(/^\{(?:([^:]+):\s+)?(.+)\}$/);
    const type = match[1] || match[2];
    const label = match[1] && match[2];

    if (type.startsWith('start_of_')) {
      const sectionType = type.substring(9);
      if (section) sections.push(section);
      section = {
        type: sectionType,
        label: label || capitalize(sectionType),
        lines: [],
      };
    } else if (type.startsWith('end_of_')) {
      const sectionType = type.substring(7);

      if (!section) {
        throw new Error(`Cannot end section of type "${sectionType}": missing opening tag.`);
      }

      if (section.type !== sectionType) {
        throw new Error(`Cannot end section of type "${sectionType}": mismatched opening tag "${section.type}".`);
      }

      sections.push(section);
      section = null;
    } else if (type === 'comment') {
      // ignored
    } else {
      messages.push({ line: lineNo, type: 'warning', message: `Ignoring directive "${type}"` });
    }
  };

  for (let lineNo = 0, l = lines.length; lineNo < l; lineNo++) {
    try {
      const line = lines[lineNo];
      if (line.startsWith('#') || !line.trim().length) continue;
      const parts = line.split(/(\{[^}]+\}|\[[^\]]+\])/g).filter(s => s.length);

      if (parts[0].startsWith('{')) {
        handleDirective(parts[0], lineNo);
      } else {
        if (!section) section = { lines: [] };
        const line = [];
        section.lines.push(line);

        parts.forEach((part, i) => {
          if (part.startsWith('[')) {
            const name = part.replace(/(^\[|\]$)/g, '');
            line.push({ chord: name });
          } else {
            if (i) {
              line[line.length - 1].text = part;
            } else {
              line.push({ text: part });
            }
          }
        });
      }
    } catch (error) {
      messages.push({ line: lineNo, type: 'error', message: error.message });
    }
  }

  if (section) sections.push(section);
  return { sections, messages };
}

function capitalize(s) {
  return s[0].toUpperCase() + (s.length > 1 ? s.substring(1) : '');
}
