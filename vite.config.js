import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  alias: {
    '@': path.resolve(__dirname, ''),
  },
  server: {
    port: 8000,
    open: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});