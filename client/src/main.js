import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import axios from "axios";
import { router } from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Admin from "@/layouts/Admin";
import Default from "@/layouts/Default";
import Blank from "@/layouts/Blank"
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import vuetify from './plugins/vuetify'
axios.defaults.baseURL = 'http://localhost:4000/api/'


Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('admin-layout', Admin)
Vue.component('default-layout', Default)
Vue.component('blank-layout', Blank)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
