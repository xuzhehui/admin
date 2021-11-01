import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from 'vue-router'
import RouteMaps from './Maps/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../login.vue')//登录页
  },
  {
    path: '/cms',
    name: 'Cms',
    component: () => import('../cms.vue'),//中央布局
    children:RouteMaps
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {//路由导航守卫
  
})

export default router
