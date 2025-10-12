import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Ensure root is correct
  server: {
    hmr: {
      overlay: true,
      port: 24678, // Try a different HMR port if conflicts
    },
    optimizeDeps: { force: true },
    watch: {
      usePolling: true, 
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  }
});