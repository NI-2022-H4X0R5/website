import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Default',
    component: () => import('../layouts/DefaultNavigation.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
      }
    ]
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../layouts/PlayField.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('../views/HomeView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
