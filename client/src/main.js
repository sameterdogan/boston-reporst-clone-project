import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import '@/store/subscriber'
import { router } from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Admin from "@/layouts/Admin";
import Default from "@/layouts/Default";
import Blank from "@/layouts/Blank"
import employee from "@/layouts/Blank"
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import vuetify from './plugins/vuetify'
import "@/plugins/axios"
import "@/plugins/google"
import "@/plugins/socket"
import VueTelInputVuetify from "vue-tel-input-vuetify";

Vue.use(VueTelInputVuetify,{vuetify})




Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('admin-layout', Admin)
Vue.component('default-layout', Default)
Vue.component('blank-layout', Blank)
Vue.component('employee-layout',employee)

store.dispatch('attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})


