import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router