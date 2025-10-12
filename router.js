import Navigo from "navigo";

const router = new Navigo('/');

const mainRoutes = [
  '/home',
  '/pages/art/art.html',
  '/pages/code/code.html',
];

const codeProjectRoutes = [
  '/pages/code/sites/robot-builder.html',
]

const allowedRoutes = [...mainRoutes, ...codeProjectRoutes];

router.on('/', () => {
  router.navigate('/home');  // Auto-redirect to /home
});

allowedRoutes.forEach(route => {
  router.on(route, () => {
    console.log(`Navigated to ${route}`);
  });
});

router.notFound(() => {
  window.location.href = '/404.html';
});

router.resolve();



