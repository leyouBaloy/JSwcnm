import Vue from 'vue'
import VueRouter from 'vue-router'
import YearCalendarView from '../views/YearCalendarView.vue'
import Analysis from '../views/Analysis.vue'
import Login from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/yearcalendar',
    name: 'YearCalendarView',
    component: YearCalendarView
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: Analysis
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
