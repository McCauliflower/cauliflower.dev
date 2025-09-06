// vite.config.js
import { defineConfig } from 'vite';

function devRewritePlugin() {
  return {
    name: 'dev-rewrites',

    // Runs only in `vite dev`
    apply: 'serve',

    configureServer(server) {
      // Return a function to register AFTER Vite's middlewares
      return () => {
        server.middlewares.use(async (req, res, next) => {
          const originalUrl = req.url;
          console.log('Original Requested URL:', originalUrl);
          if (req.method !== 'GET') return next();
          const url = (req.url || '');
          // After possible rewrite, log the final URL
          // Pretty paths
          if (url === '/code') { req.url = '/pages/code/code.html'; console.log('Rewritten URL:', req.url); return next(); }
          if (url === '/art') { req.url = '/pages/art/art.html'; console.log('Rewritten URL:', req.url); return next(); }
          if (url === '/robot-builder') { req.url = '/pages/code/sites/robot-builder/index.html'; console.log('Rewritten URL:', req.url); return next(); }
          if (url === '/' || url === '/home') { req.url = '/index.html'; console.log('Rewritten URL:', req.url); return next(); }

          else{
            req.url = '/404.html';
            console.log('Rewritten URL:', req.url);
            return next();
          }
          // Pretty paths
          if (url === '/' || url === '/home') { req.url = '/index.html'; return next(); }
          if (url === '/code') { req.url = '/pages/code/code.html'; return next(); }
          if (url === '/art') { req.url = '/pages/art/art.html'; return next(); }
          if (url === '/robot-builder') { req.url = '/pages/code/sites/robot-builder/index.html'; return next(); }
          else{
            req.url = '/404.html';
            return next();
          }
        });
      };
    },
  };
}

// ✅ Export an object (or promise) — this is what Vite expects
export default defineConfig({
  base: '/',
  plugins: [devRewritePlugin()],
});
