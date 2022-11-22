import { createRouter, createWebHashHistory } from 'vue-router'

import toyApp from '../views/toy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'
import dashboard from '../views/dashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/toy'
  },
  {
    path: '/toy',
    component: toyApp
  },
  {
    path: '/toy/edit/:id?',
    component: toyEdit
  },
  {
    path: '/toy/:id',
    component: toyDetails
  },
  {
    path: '/dashboard',
    component: dashboard
  }
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})