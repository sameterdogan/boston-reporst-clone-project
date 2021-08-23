import axios from 'axios'


const transferStore = {
    state: {
        transfer: null,
        transfers:[]
    },
    mutations: {
        INIT_TRANSFERS(state,transfers) {
            state.transfers = transfers
        },
        INIT_TRANSFER(state,transfer){
            state.transfer=transfer
        }
    },
    actions: {
        initTransfers:({commit})=>{
            return    axios.get(`transfers/all-transfers`)
                .then(res=>{
                    console.log(res)
                    commit("INIT_TRANSFERS",res.data.transfers)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        initTransfer:({commit},transferId)=>{
            return    axios.get(`transfers/transfer-by-id/${transferId}`)
                .then(res=>{
                    console.log(res)
                    commit("INIT_TRANSFER",res.data.transfer)
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
        getTransfer:state=>state.transfer
    },
}

export default transferStore