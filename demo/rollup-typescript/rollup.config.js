const { uglify } = require('rollup-plugin-uglify');
const buble = require('@rollup/plugin-buble'); 
const typescript = require('@rollup/plugin-typescript');
process.env.NODE_ENV = 'production';

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  }, 
  plugins: [
    typescript(),
    buble(),
    uglify()
  ],
}