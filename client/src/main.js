import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import '@/store/subscriber'
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
import * as VueGoogleMaps from 'vue2-google-maps'
axios.defaults.baseURL = 'http://localhost:5000/api/'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAdOxQ8xLbG4myEibquVReWi8yYdZ1YPUA',
    libraries: 'places',

  },
})

Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('admin-layout', Admin)
Vue.component('default-layout', Default)
Vue.component('blank-layout', Blank)

store.dispatch('attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})


