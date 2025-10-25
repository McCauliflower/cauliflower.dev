import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5173,                 // make it explicit
    hmr: {                      // usually you can omit this entirely
      overlay: true
    },
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
    optimizeDeps: { force: true },
  },
});
