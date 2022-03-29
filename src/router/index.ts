import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Pinia from '@/views/Pinia.vue'
import Test from '@/views/test.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pinia',
    name: 'Pinia',
    component: Pinia
  },


  {
    path: '/test',
    name: 'Test',
    component: Test
  },

  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@/views/axios.vue') // 懒加载组件
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
