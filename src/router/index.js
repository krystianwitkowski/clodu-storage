import Vue from 'vue'
import VueRouter from 'vue-router'

import Drive from '../views/Drive.vue'
import Starred from '../views/Starred.vue'
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
    path: '/starred',
    name: 'Starred',
    component: Starred
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
