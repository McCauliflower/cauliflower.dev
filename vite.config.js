import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Ensure root is correct
  server: {
    hmr: {
      overlay: true,
      port: 5174,
    },
    optimizeDeps: { force: true },
    watch: {
      usePolling: true, 
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  proxy: {
    // Proxy auth routes to Express
    '/auth/*': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    // Proxy API routes to Express
    '/api/*': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }
  }
});
