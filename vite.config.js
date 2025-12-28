import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './',
  root: '.',
  plugins: [vue()],
  resolve: {
    alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)) // Alias for src folder
    },
  },
  build: {
    rollupOptions: {
      input: fileURLToPath(new URL('./index.html', import.meta.url)),
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 0, // Prevent large images from being inlined
  },
  server: {
    hmr: true,
    port: 5173,
    // needed for WSL2 file change detection
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
