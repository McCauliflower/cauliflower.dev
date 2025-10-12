import Navigo from "navigo";

const router = new Navigo('/');

const allowedRoutes = [
  '/home',
  '/pages/art/art.html',
  '/pages/code/code.html',
];

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



