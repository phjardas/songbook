import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/local.js',
  output: {
    dir: 'build',
    file: 'local.js',
    format: 'cjs',
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
