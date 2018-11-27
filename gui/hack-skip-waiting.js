'use strict';
const replace = require('replace-in-file');

try {
  replace.sync({
    files: 'build/service-worker.js',
    from: /workbox\.clientsClaim\(\);$/gm,
    to: match => `workbox.skipWaiting();\n${match}`,
  });
} catch (e) {
  process.exit(1);
}
