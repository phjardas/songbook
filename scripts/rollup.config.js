import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'build',
    file: 'index.js',
    format: 'cjs',
    sourcemap: 'inline',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
  ],
};
