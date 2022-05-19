import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { defaultRoutes } from './defaultRoutes';

export * from './constant';

const routes: RouteRecordRaw[] = defaultRoutes;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
