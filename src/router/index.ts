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
    path: '/game/',
    name: 'Game',
    component: () => import('../layouts/PlayField.vue'),
    children: [
      {
        path: '',
        name: 'Playground',
        component: () => import('../views/GameRound.vue')
      }
    ]
  },
  {
    path: '/auth/',
    name: 'Authentication',
    component: () => import('../layouts/UserAuthentication.vue'),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/auth/LoginForm.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/auth/RegisterForm.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
