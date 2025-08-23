import homepageScripts from '../public/pages/home/scripts.js';

// Vanilla JS Router
const homepage = '/pages/home/index.html';
const routes = {
  '/': homepage,
  '/art': '/pages/art/index.html',
  '/code': '/pages/code/index.html',
};

function loadPage(url) {
    console.log('url', url)
  let scripts = [];
  fetch(url)
    .then(res => res.text())
    .then(html => {
      // For content.html, just inject the HTML directly
      document.getElementById('app').innerHTML = html;
      // Dynamically load scripts for homepage
      if (url === homepage) {
        scripts = homepageScripts;
      }
      scripts.forEach(({ src, type }) => {
          const script = document.createElement('script');
          script.src = src;
          if (type) script.type = type;
          document.body.appendChild(script);
      });
    });
}

function onNavigate(path) {
  window.history.pushState({}, path, window.location.origin + path);
  loadPage(routes[path] || homepage);
}

window.onpopstate = () => {
  loadPage(routes[window.location.pathname] || homepage);
};

// Initial load
window.addEventListener('DOMContentLoaded', () => {
  // Always load /pages/home/index.html into #app on startup
  loadPage(homepage);
  // Example navigation links
  document.body.addEventListener('click', function(e) {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      onNavigate(e.target.getAttribute('href'));
    }
  });
});
