import Vue from 'vue'
import Vuex from 'vuex'
import authStore from "@/store/modules/authStore";
import messageStore from "@/store/modules/messageStore";
import userStore from "@/store/modules/userStore";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        authStore,
        messageStore,
        userStore
    },
})

export default store