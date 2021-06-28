import axios from 'axios'


const reportStore = {
    state: {
        reports: []
    },
    mutations: {
        INIT_REPORTS(state,reports) {
            state.reports = reports
        },
    },
    actions: {
        initReports:({commit})=>{
            axios.get("reports/all-reports")
                .then(res=>{
                    console.log(res.data.allReports)
                    commit("INIT_REPORTS",res.data.allReports)
                })
                .catch(err=>{
                    console.log(err.response)
                })
        },


    },

    getters: {
        getReports:state=>state.reports
    },
}

export default reportStore