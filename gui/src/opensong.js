export function parseLyrics(lyrics) {
  lyrics = lyrics.replace(/\r\n?/g, '\n');
  const lyricsLines = lyrics.split('\n');

  const dataModel = [];
  let dataObject = {
    header: undefined,
    lines: [],
  };
  dataModel.push(dataObject);

  while (lyricsLines.length > 0) {
    const line = lyricsLines.shift();
    if (!line) continue;

    switch (line[0]) {
      // header
      case '[': {
        // add new object if current is "used"
        if (dataObject.lines.length) {
          dataObject = {
            header: undefined,
            lines: [],
          };
          dataModel.push(dataObject);
        }

        const header = line.match(/\[(.*)\]/)[1];
        dataObject.header = header;
        break;
      }
      // chords (with lyrics)
      case '.': {
        let chordsLine = line.substr(1);
        const chordArr = [];
        let m = null;

        // split cords
        while (chordsLine.length > 0) {
          m = /^(\S*\s*)(.*)/.exec(chordsLine);
          chordArr.push(m[1]);
          chordsLine = m[2];
        }
        // add an item if it is an empty line
        if (chordArr.length === 0) chordArr.push(chordsLine);

        // clean Chord line from trailing white spaces
        const chordArrCleaned = [];
        chordArr.forEach(value => {
          m = /(\S*\s?)\s*/.exec(value);
          chordArrCleaned.push(m[1]);
        });

        let textLine = '';
        let textLineArr = [];
        m = null;

        // while we have lines that match a textLine create an html table row
        while (true) {
          textLine = lyricsLines.shift();
          if (!textLine) break;
          m = textLine.match(/^([ 1-9])(.*)/);
          if (!m) break;
          const textArr = [];
          textLine = m[2];
          // split lyrics line based on chord length
          for (const i in chordArr) {
            if (i < chordArr.length - 1) {
              const chordLength = chordArr[i].length;
              // split String with RegExp (is there a better way?)
              m = textLine.match(new RegExp(`(.{0,${chordLength}})(.*)`));
              if (m) {
                textArr.push(m[1]);
                textLine = m[2];
              }
            } else {
              // add the whole string if at the end of the chord arr
              textArr.push(textLine);
            }
          }

          textLineArr = [...textLineArr, ...textArr];
        }

        dataObject.lines.push({
          chords: chordArrCleaned,
          lyrics: textLineArr.length ? textLineArr : undefined,
        });

        // attach the line again in front (we cut it off in the while loop)
        if (textLine !== 'undefined') lyricsLines.unshift(textLine);
        break;
      }
      // comments
      case ';': {
        dataObject.lines.push({ comments: line.substr(1) });
        break;
      }
      // lyrics and everythings else
      default: {
        if (/^[ 0-9]/.test(line)) dataObject.lines.push({ lyrics: [line.substr(1)] });
      }
    }
  }

  return dataModel;
}
