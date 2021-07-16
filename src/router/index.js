import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "首页",
        },
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        meta: {
          title: "关于",
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        children: [
          {
            path: '1',
            name: 'About1',
            meta: {
              title: "关于1",
            },
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
          },
          {
            path: '2',
            name: 'About2',
            meta: {
              title: "关于2",
              hideInMenu: true
            },
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
          },
        ]
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
