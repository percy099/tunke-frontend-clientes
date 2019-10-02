import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AccountOpening from './views/AccountOpening.vue'
import moneyLending from './views/moneyLending.vue'
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
      path: '/moneyLending',
      name: 'moneyLending',
      component: () => import('./views/moneyLending.vue')
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
    }
  ]
})
