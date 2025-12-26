import { createRouter, createWebHistory } from 'vue-router';

// Use lazy-loaded Vue page components (converted from static HTML pages)
const Home = () => import('@/pages/Home.vue');
const Art = () => import('@/pages/Art.vue');
const Code = () => import('@/pages/Code.vue');
const Auth = () => import('@/pages/Auth.vue');
const NotFound = () => import('@/pages/NotFound.vue');


const routes = [
  { path: '/', component: Home },
  { path: '/art', component: Art },
  { path: '/code', component: Code },
  { path: '/auth', component: Auth },
  // Project site routes - direct HTML file access
  { path: '/userinfo', component: () => {} },
  { path: '/sites/robot-builder/index.html', component: () => {} },
  { path: '/sites/unicode-hieroglyphs/unicodeLoop.html', component: () => {} },
  { path: '/sites/tree-fractal/index.html', component: () => {} },
  { path: '/sites/snake/index.html', component: () => {} },
  { path: '/sites/divz/index.html', component: () => {} },
  { path: '/sites/thesis/index.html', component: () => {} },
  { path: '/sites/ballpit/index.html', component: () => {} },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
