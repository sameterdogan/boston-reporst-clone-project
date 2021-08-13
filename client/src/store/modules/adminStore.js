import axios from "axios";

const adminStore = {
    state: {
        admins:[]
    },
    mutations: {
        INIT_ADMINS(state,admins){
            state.admins=admins
        }
    },
    actions:{
       async initAdmins({commit}){
           try {
          const res= await    axios.get("admins/all-admins")
               commit("INIT_ADMINS",res.data.admins)
           }catch (err){
           console.log(err.response)
           }
        }
    },
    getters: {
        getAdmins:state=>state.admins
    },
}

export default adminStore