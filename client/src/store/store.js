import Vue from 'vue'
import Vuex from 'vuex'
import authStore from "@/store/modules/authStore";
import messageStore from "@/store/modules/messageStore";
import userStore from "@/store/modules/userStore";
import categoryStore from "@/store/modules/categoryStore";
import reportStore from "@/store/modules/reportStore"
import loadingStore from "@/store/modules/loadingStore";
import adminStore from "@/store/modules/adminStore";
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        authStore,
        messageStore,
        userStore,
        categoryStore,
        reportStore,
        loadingStore,
        adminStore
    },
})

export default store