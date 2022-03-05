import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  root: './client/src',
  publicDir: false,
  server: {
    middlewareMode: true,
  },
  plugins: [vue(), vueJsx()],
  rollupOptions: {
    input: './client/src/main.js',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./client/src', import.meta.url)),
    },
  },
});
