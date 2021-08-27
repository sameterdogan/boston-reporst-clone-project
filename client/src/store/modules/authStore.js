import axios from 'axios'
import {router} from "@/router"

const authStore = {
    state: {
        token: null,
        admin: null,
        employee:null
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
        login({ commit,dispatch }, admin) {
            axios.post('auth/admin-login', admin)
                .then((res)=>{
                    console.log(res)
                    dispatch('attempt', res.data.token)
                   if( res.data.admin.role==="superAdmin"){
                       setTimeout(()=>{
                           router.push("/admin/reports/waiting-reports")
                       },300)
                   }else if(res.data.admin.role==="admin"){
                       setTimeout(()=>{
                           router.push("/admin/reports/waiting-reports")
                       },300)
                   }
                   else if(res.data.admin.role==="employee"){
                       setTimeout(()=>{
                           router.push("/employee/reports/active-reports")
                       },300)
                   }

                })
                .catch(err=>{
                    console.log(err.response)
                    commit('INIT_MESSAGE', {message: err.response.data.message, color: 'danger',})
                })

        },
      async attempt({ commit, state }, token) {
            if (token) {
                commit('INIT_TOKEN', token)
            }
            if (!state.token) return
            try {
                const res = await axios.get('admins/get-admin')
                console.log(res)
                commit('INIT_ADMIN', res.data.user)
            } catch (err) {
                console.log(err.response)
                commit('INIT_ADMIN', null)
                commit('INIT_TOKEN', null)
                console.log('failed')
            }
        },
        /*
      async attemptEmployee({ commit, state }, token) {
          if (token) {
              commit('INIT_TOKEN', token)
          }
          if (!state.token) return
          try {
              const res = await axios.get('employees/get-employee')
              console.log(res)
              commit('INIT_EMPLOYEE', res.data.employee)
          } catch (err) {
              console.log(err.response)
              commit('INIT_EMPLOYEE', null)
              commit('INIT_TOKEN', null)
              console.log('failed')
          }
      },*/
        logout({ commit }) {
            commit('INIT_TOKEN', null)
            commit('INIT_ADMIN', null)
            localStorage.removeItem("token");
        },
    },

    getters: {
        authenticated(state) {
            return state.token && state.admin
        },
        employeeAuthenticated(state){
            return state.token && state.employee
        },
        getAdmin(state) {
            return state.admin
        },
        getEmployee(state){
            return state.employee
        }
    },
}

export default authStore