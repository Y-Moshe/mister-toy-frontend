import { createRouter, createWebHashHistory } from 'vue-router'

import toyAppView from '../views/toy-app.view.vue'
import toyEditView from '../views/toy-edit.view.vue'
import toyDetailsView from '../views/toy-details.view.vue'
import adminDashboardView from '../views/admin-dashboard.view.vue'
import authView from '../views/auth.view.vue'
import profileView from '../views/profile.view.vue'

const routes = [
  {
    path: '/',
    redirect: '/toy'
  },
  {
    path: '/toy',
    component: toyAppView
  },
  {
    path: '/toy/edit/:id?',
    component: toyEditView
  },
  {
    path: '/toy/:id',
    component: toyDetailsView
  },
  {
    path: '/profile/:username',
    component: profileView
  },
  {
    path: '/admin/dashboard',
    component: adminDashboardView
  },
  {
    path: '/auth/login',
    component: authView,
    props: { isLogin: true }
  },
  {
    path: '/auth/signup',
    component: authView,
    props: { isLogin: false }
  }
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})