import { createRouter, createWebHistory } from 'vue-router';
import { staticRoutes } from './staticRoutes';

const routes = [...staticRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
