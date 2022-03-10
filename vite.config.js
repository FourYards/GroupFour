import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  root: './client',
  publicDir: false,
  server: {
    middlewareMode: true,
  },
  plugins: [vue(), vueJsx()],
  build: {
    manifest: true,
    rollupOptions: {
      input: './client/main.js',
    },
  },
  optimizeDeps: {
    entries: ['main.js'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./client', import.meta.url)),
    },
  },
});
