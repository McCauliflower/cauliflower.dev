import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: '.',
  plugins: [vue()],
  server: {
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws',
    },
  },
});
