import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/progress',
      name: 'progress',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "health" */ './views/Progress.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import(/* webpackChunkName: "profile" */ './views/Tools.vue')
    },
    {
      path: '/userProfile/:id',
      name: 'userProfile',
      component: () => import(/* webpackChunkName: "profile" */ './views/userProfile.vue')
    }

  ]
})
