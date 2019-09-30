import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

 
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

Vue.use(VueFormWizard)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueFormWizard,
  render: h => h(App)
}).$mount('#app')



