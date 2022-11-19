import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy'

export default defineConfig({
  input: 'src/index.html',
  root: 'src',
  build: {
    outDir: '../dist',
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/styles.css', dest: 'dist' },
        { src: 'src/assets', dest: 'dist' },
        { src: 'src/index.css', dest: 'dist' },
        { src: 'src/normalize.css', dest: 'dist' }
      ]
    })
  ]
});
