// router.js
import Navigo from "navigo";

const router = new Navigo('/');

const mainRoutes = [
  '/',
  '/home',
  '/pages/art/art.html',
  '/pages/code/code.html',
  '/pages/auth/auth.html',
];

const codeProjectRoutes = [
  '/pages/code/sites/robot-builder.html',
  '/pages/code/sites/unicode-hieroglyphs/unicodeLoop.html',
  '/pages/code/sites/tree-fractal/index.html',
  '/pages/code/sites/thesis/index.html',
  '/pages/code/sites/divz/index.html',
  '/pages/code/sites/snake/index.html',
]

const allowedRoutes = [...mainRoutes, ...codeProjectRoutes];

router.on('/', () => {
  router.navigate('/');  // Auto-redirect to /home
});

allowedRoutes.forEach(route => {
  router.on(route, () => {
    console.log(`Navigated to ${route}`);
  });
});

// router.notFound(() => {
//  window.location.href = '/404.html';
// });

router.resolve();



