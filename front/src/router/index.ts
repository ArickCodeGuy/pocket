import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/game',
    name: 'Game',
    meta: {Authenticated: true},
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
    meta: {Authenticated: true},
    component: () => import('../views/game/user/Info.vue')
  },
  {
    path: '/game/user/skills',
    name: 'User skills',
    meta: {Authenticated: true},
    component: () => import('../views/game/user/Skills.vue')
  },
  {
    path: '/game/user/backpack',
    name: 'User backpack',
    meta: {Authenticated: true},
    component: () => import('../views/game/user/Backpack.vue')
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.Authenticated)) { // нужна ли авторизацию на этой странице
        if (store.state.status === null) { // если не задан статус пользователя
            await store.dispatch('checkStatus') // запрос данных о аккаунте из кеша
            if (store.state.status === false) {
                next({ path: '/login' })
                return
            }
            next()
        } else { next() }
    } else { next() }
})

export default router
