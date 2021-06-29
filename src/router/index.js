import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '../views/Register.vue'
//import Login from '../views/Login.vue'
//import Dashboard from '../views/Dashboard.vue'

//import Drive from '../components/Drive.vue'
//import Starred from '../components/Starred.vue'
//import Trash from '../components/Trash.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Register
  }

  /*
  {
    path: '/',
    component: Dashboard,
    redirect: '/dashboard/drive',
    children: [
      {
        path: '/dashboard/drive',
        component: Drive
      }
    ]
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: '/dashboard/drive',
    component: Dashboard,
    children: [
      {
        path: '/dashboard/drive',
        component: Drive
      }
    ]
  },
  {
    path: '/dashboard/starred',
    component: Dashboard,
    children: [
      {
        path: '/dashboard/starred',
        component: Starred
      }
    ]
  },
  {
    path: '/dashboard/trash',
    component: Dashboard,
    children: [
      {
        path: '/dashboard/trash',
        component: Trash
      }
    ]
  }
  */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
