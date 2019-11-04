import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AccountOpening from './views/AccountOpening.vue'
import LendingDNI from './components/LendingDNI.vue'
import OpeningDNI from './components/OpeningDNI.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/accountOpening',
      name: 'accountOpening',
      component: () => import('./views/AccountOpening.vue')
    },
    {
      path: '/accountOpeningClient',
      name: 'accountOpeningClient',
      component: () => import('./views/AccountOpeningClient.vue')
    },
    {
      path: '/LendingDNI',
      name: 'LendingDNI',
      component: () => import('./components/LendingDNI.vue')
    },
    {
      path: '/openingDNI',
      name: 'openingDNI',
      component: () => import('./components/OpeningDNI.vue')
    },
    {
      path: '/blackList',
      name: 'blackList',
      component: () => import('./views/BlackList.vue')
    },
    {
      path: '/summarySale',
      name: 'summarySale',
      component: () => import('./components/SummarySale.vue')
    },
    {
      path: '/lending',
      name: 'lending',
      component: () => import('./views/Lending.vue')
    },
  ]
})
