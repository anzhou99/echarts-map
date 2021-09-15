import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  plugins: [
    json(),
    terser({
      output: {
        ascii_only: true,
      },
    }),
  ],
};
