import axios from 'axios'


const transferStore = {
    state: {
        transfer: [],
        transfers:[]
    },
    mutations: {
        INIT_TRANSFERS(state,transfers) {
            state.transfers = transfers
        },
    },
    actions: {
        initTransfer:({commit})=>{
            return    axios.get(`transfers/all-transfers`)
                .then(res=>{
                    console.log(res)
                    commit("INIT_TRANSFERS",res.data.transfers)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        newTransfer:({commit},transferInfo)=>{
            axios.post(`transfers/new-transfer`,transferInfo)
                .then(res=>{
                    console.log(res)
                    commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
                    commit("OPEN_REPORT",transferInfo.reportId)
                }).catch(err=>{
                console.log(err.response)
            })
        },




    },

    getters: {
        getEmployeesByCategory:state=>state.employeesByCategory
    },
}

export default transferStore