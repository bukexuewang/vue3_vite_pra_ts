import { RouteRecordRaw } from 'vue-router';
import { LOGIN } from './constant';

export const defaultRoutes: RouteRecordRaw[] = [
  {
    ...LOGIN,
    meta: { title: '登录' },
    component: () => import('@/views/login/index.vue')
  }
];
