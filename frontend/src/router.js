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
    {
      path: '/lendingBlackList',
      name: 'lendingBlackList',
      component: () => import('./views/LendingBlackList.vue')
    },
    {
      path: '/lendingWithoutCampaign',
      name: 'lendingWithoutCampaign',
      component: () => import('./views/LendingWithoutCampaign.vue')
    },
    {
      path: '/lendingWithoutAccount',
      name: 'lendingWithoutAccount',
      component: () => import('./views/LendingWithoutAccount.vue')
    },
    {
      path: '/lendingActive',
      name: 'lendingActive',
      component: () => import('./views/LendingActive.vue')
    },
    {
      path: '/Step4Lending',
      name: 'Step4Lending',
      component: () => import('./components/Step4Lending.vue')
    },
    {
      path: '/summaryLoan',
      name: 'summaryLoan',
      component: () => import('./components/SummaryLoan.vue')
    }
  ]
})
