import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AccountOpening from './views/AccountOpening.vue'
import moneyLending from './views/moneyLending.vue'

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
      path: '/accountOpening',
      name: 'accountOpening',
      component: AccountOpening
    },
    {
      path: '/moneyLending',
      name: 'moneyLending',
      component: moneyLending
    }
  ]
})
