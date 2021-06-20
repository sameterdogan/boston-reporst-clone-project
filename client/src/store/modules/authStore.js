import axios from 'axios'
import {router} from "@/router"

const authStore = {
    state: {
        authenticated:false
    },
    mutations: {
        SET_AUTH(state, auth) {
            state.authenticated = auth
        },

    },
    actions: {
      setAuth:({commit},loginInfo)=>{
          axios.post('auth/login', loginInfo,{withCredentials: true})
              .then(()=>{
                  commit("SET_AUTH",true)
                  router.push("/admin")
              })
              .catch(err=>{
                  commit("SET_AUTH",false)
                  console.log(err.response)
              })
      }

    },

    getters: {

    },
}

export default authStore