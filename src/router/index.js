import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/video',
        component: () => import('@/views/video')
      },
      {
        path: '/qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
