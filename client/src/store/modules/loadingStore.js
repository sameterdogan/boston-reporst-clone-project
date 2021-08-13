


const loadingStore = {
    state: {
      loading:false
    },
    mutations: {
      SET_LOADING(state,bool){
          state.loading=bool
      }
    },
    actions:{
        setLoading({commit},bool){
            commit("SET_LOADING",bool)
        }
    },
    getters: {
        getLoading:state=>state.loading
    },
}

export default loadingStore