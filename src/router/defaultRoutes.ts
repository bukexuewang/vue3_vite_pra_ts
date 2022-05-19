import { RouteRecordRaw } from 'vue-router';
import { LOGIN, HOME } from './constant';

export const defaultRoutes: RouteRecordRaw[] = [
  {
    ...HOME,
    meta: { title: '首页' },
    component: () => import('@/views/home/index.vue'),
  },
  {
    ...LOGIN,
    meta: { title: '登录' },
    component: () => import('@/views/login/index.vue'),
  },
];
