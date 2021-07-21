import Vue from 'vue'
import VueRouter from 'vue-router'

import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import Dashboard from '../views/Dashboard.vue'

import Drive from '../components/Drive.vue'
import Starred from '../components/Starred.vue'
import Trash from '../components/Trash.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: SignUp
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/signup',
    component: SignUp
  },
  {
    path: '/dashboard/drive',
    component: Dashboard,
    children: [
      {
        path: '',
        component: Drive
      }
    ]
  },
  {
    path: '/dashboard/starred',
    component: Dashboard,
    children: [
      {
        path: '',
        component: Starred
      }
    ]
  },
  {
    path: '/dashboard/trash',
    component: Dashboard,
    children: [
      {
        path: '',
        component: Trash
      }
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})