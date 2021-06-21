import Vue from 'vue'
import VueRouter from 'vue-router'

import Drive from '../views/Drive.vue'
import Latest from '../views/Latest.vue'
import Trash from '../views/Trash.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Drive',
    component: Drive
  },
  {
    path: '/drive',
    name: 'Drive',
    component: Drive
  },
  {
    path: '/latest',
    name: 'Latest',
    component: Latest
  },
  {
    path: '/trash',
    name: 'Trash',
    component: Trash
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
