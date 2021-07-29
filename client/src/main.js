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
axios.interceptors.response.use(function(response) {
  return response
}, function(error) {
  if (error.response) {
    console.log(error.response.data.status)
    switch (error.response.data.status) {
      case 404:
        router.push({ name: '404' })
        break
      case 403:
        router.push({ name: '403' })
            break
      case 401:
        router.push({ name: '401' })
            break
      default: router.push({name:"500"})
    }

  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error', error.message)
  }

  return Promise.reject(error) // this is the important part
})
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


