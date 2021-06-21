import axios from 'axios'
import {router} from "@/router"

const authStore = {
    state: {
        token: null,
        admin: null,
    },
    mutations: {
        INIT_TOKEN(state, token) {
            console.log(token)
            state.token = token
        },
        INIT_ADMIN(state, admin) {
            state.admin = admin
        },
    },
    actions: {
        login({ dispatch }, admin) {
            axios.post('auth/admin-login', admin)
                .then((res)=>{
                    console.log(res)
                    dispatch('attempt', res.data.token)
                    setTimeout(()=>{
                        router.push("/admin")
                    },10000)

                })

        },
        async attempt({ commit, state }, token) {
            if (token) {
                commit('INIT_TOKEN', token)
            }
            if (!state.token) return
            try {
                const res = await axios.get('users/get-admin')
                console.log(res)
                commit('INIT_ADMIN', res.data.admin)
            } catch (err) {
                console.log(err.response)
                commit('INIT_ADMIN', null)
                commit('INIT_TOKEN', null)
                console.log('failed')
            }
        },
        logout({ commit }) {
            commit('INIT_TOKEN', null)
            commit('INIT_ADMIN', null)
        },
    },

    getters: {
        authenticated(state) {
            console.log(state.token && state.admin ? true : false +"asdasdaaaaaaaaaaaaaaa")
            return state.token && state.admin
        },
        getAdmin(state) {
            return state.admin
        },
    },
}

export default authStore