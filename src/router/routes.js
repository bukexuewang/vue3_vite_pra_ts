export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/other',
    name: 'Other',
    component: () => import('@/views/other/index.vue')
  }
];
