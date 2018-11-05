import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'build',
    file: 'index.js',
    format: 'cjs',
    sourcemap: 'inline',
  },
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
  ],
};
