import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/game/index.vue')
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('../views/Forum.vue')
  },
  {
    path: '/game/user/info',
    name: 'User info',
    component: () => import('../views/game/user/Info.vue')
  },
  {
    path: '/game/user/skills',
    name: 'User skills',
    component: () => import('../views/game/user/Skills.vue')
  },
  {
    path: '/game/user/backpack',
    name: 'User backpack',
    component: () => import('../views/game/user/Backpack.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
