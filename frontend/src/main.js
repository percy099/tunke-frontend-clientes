import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'



import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import CircularCountDownTimer from "vue-circular-count-down-timer";
Vue.use(CircularCountDownTimer);

Vue.use(VueFormWizard)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueFormWizard,
  render: h => h(App)
}).$mount('#app')



