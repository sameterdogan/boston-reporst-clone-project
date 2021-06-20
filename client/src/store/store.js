import Vue from 'vue'
import Vuex from 'vuex'
import authStore from "@/store/modules/authStore";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        authStore
    },
})

export default store