import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Element from '../components/Element.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/element',
    name: 'element',
    component: Element
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
