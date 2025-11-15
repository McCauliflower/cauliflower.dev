import { createRouter, createWebHistory } from 'vue-router';

// Use lazy-loaded Vue page components (converted from static HTML pages)
const Home = () => import('../pages/Home.vue');
const Art = () => import('../pages/Art.vue');
const Code = () => import('../pages/Code.vue');
const Auth = () => import('../pages/Auth.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/art', component: Art },
  { path: '/code', component: Code },
  { path: '/auth', component: Auth },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
