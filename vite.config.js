import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
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