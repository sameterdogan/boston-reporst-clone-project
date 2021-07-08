import axios from 'axios'
import {router} from "../../router"


const reportStore = {
    state: {
        reports: [],
        publicReports:[],
        selectCategory:null
    },
    mutations: {
        INIT_REPORTS(state,reports) {
            state.reports = reports
        },
        INIT_PUBLIC_REPORTS(state,publicReports){
              state.publicReports=publicReports
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
        initPublicReports:async  ({commit})=>{
            try{
                const res=await  axios.get("reports/public-reports")

                console.log(res.data.publicReports)
                commit("INIT_PUBLIC_REPORTS",res.data.publicReports)

            }catch (err) {
                console.log(err.response)
            }


        },
        newReport:async ({commit},newReportInfo)=>{
            try{
                const res=await  axios.post("reports/new-report",newReportInfo)

                console.log(res.data)
             /*   commit("NEW_REPORT",res.data.allReports)*/
              await  router.push("/")
                commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
            }catch (err) {
                console.log(err.response)
                commit("INIT_MESSAGE",{message:err.response.data.message,color:"danger"})
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
        getReports:state=>state.reports,
        getPublicReports:state=>state.publicReports
    },
}

export default reportStore