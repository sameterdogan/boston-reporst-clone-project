import axios from 'axios'


const reportStore = {
    state: {
        reports: [],
        selectCategory:null
    },
    mutations: {
        INIT_REPORTS(state,reports) {
            state.reports = reports
        },
        DELETE_REPORT(state,reportId) {
            const reportIndex=state.reports.findIndex(r=>r._id===reportId)
            if(reportIndex >=0){
                state.reports.splice(reportIndex,1)
            }
        },
        SELECT_CATEGORY(state,categoryInfo){
            state.selectCategory=categoryInfo
        }
    },
    actions: {
        initReports:async ({commit})=>{
            try{
                const res=await  axios.get("reports/all-reports")

                console.log(res.data.allReports)
                commit("INIT_REPORTS",res.data.allReports)
            }catch (err) {
                console.log(err.response)
            }


        },
        deleteReport:async ({commit},reportId)=>{
            try{
                const res=await  axios.delete(`reports/delete-report/${reportId}`)

                console.log(res.data)
                commit("DELETE_REPORT",reportId)
            }catch (err) {
                console.log(err.response)
            }


        },
        selectCategory:({commit},categoryInfo)=>{
            commit("SELECT_CATEGORY",categoryInfo)
        }


    },

    getters: {
        getReports:state=>state.reports
    },
}

export default reportStore