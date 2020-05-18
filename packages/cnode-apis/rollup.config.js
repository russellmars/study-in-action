import path from 'path'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
    },
    {
      file: 'lib/index.es.js',
      format: 'es'
    }
  ],
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, '.babelrc')
    })
    // babel({
    //   exclude: 'node_modules/**',
    //   babelHelpers: "runtime"
    // })
  ],
  external: ['query-string']
};