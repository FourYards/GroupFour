import { fileURLToPath, URL } from 'url';
import { readdirSync, statSync } from 'fs';
import { join, relative, resolve, sep, posix } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import FullReload from 'vite-plugin-full-reload';

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (statSync(resolve(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(join(dirPath, file));
    }
  });

  return arrayOfFiles;
};

const inputFiles = {};
const pagesFilePath = fileURLToPath(new URL('./client/page', import.meta.url));

getAllFiles(pagesFilePath)
  .map((file) => relative(pagesFilePath, file))
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const normalizedFilePath = file.split(sep).join(posix.sep);
    const fileParts = normalizedFilePath.split('.');
    const pageScriptName = fileParts.splice(0, fileParts.length - 1).join('.');

    if (pageScriptName === 'index') {
      inputFiles.main = './client/pages/index.js';
    } else {
      inputFiles[pageScriptName] = './client/pages/' + pageScriptName + '.js';
    }
  });

// https://vitejs.dev/config/
export default defineConfig({
  root: './client',
  publicDir: false,
  server: {
    middlewareMode: true,
  },
  plugins: [
    vue(),
    vueJsx(),
    FullReload(['server/views/**/*'], { root: fileURLToPath(import.meta.url) }),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: inputFiles,
    },
  },
  optimizeDeps: {
    entries: ['pages/*.js'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./client', import.meta.url)),
    },
  },
});
