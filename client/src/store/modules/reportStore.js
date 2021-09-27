import axios from 'axios'
import {router} from "../../router"


const reportStore = {
    state: {
        reports: [],
        report:{},
        publicReports:[],
        activeReports:[],
        solvedReports:[],
        waitingReports:[],
        activeReportsCount:null,
        solvedReportsCount:null,
        waitingReportsCount:null,
        employeeActiveReports:[],
        employeeSolvedReports:[],
        employeeActiveReportsCount:null,
        employeeSolvedReportsCount:null,
        reportsBySubCategoryId:[],
        selectCategory:null,
        publicReportQueryProps:{
            filter: {
                title:"",
                status:""
            },
            pagination: { page: 1, limit: 3, isEndIndex: false },
        },
        publicReportPaginationCardInfo:{
        },

    },
    mutations: {
        INIT_REPORTS(state,reports) {
            state.reports = reports
        },
        INIT_EMPLOYEE_ACTIVE_REPORTS_COUNT(state,activeReportsCount){
            state.employeeActiveReportsCount=activeReportsCount
        },
        INIT_EMPLOYEE_SOLVED_REPORTS_COUNT(state,solvedReportsCount){
            state.employeeSolvedReportsCount=solvedReportsCount
        },
        INIT_ACTIVE_REPORTS_COUNT(state,activeReportsCount){
            state.activeReportsCount=activeReportsCount
        },
        INIT_SOLVED_REPORTS_COUNT(state,solvedReportsCount){
            state.solvedReportsCount=solvedReportsCount
        },
        INIT_WAITING_REPORTS_COUNT(state,waitingReportsCount){
            state.waitingReportsCount=waitingReportsCount
        },
        INIT_PUBLIC_REPORTS(state,publicReports){
              state.publicReports=publicReports
        },
        INIT_ACTIVE_REPORTS(state,activeReports){
            state.activeReports=activeReports
        },
        INIT_SOLVED_REPORTS(state,solvedReports){
            state.solvedReports=solvedReports
        },
        INIT_WAITING_REPORTS(state,waitingReports){
            state.waitingReports=waitingReports
        },
        INIT_REPORTS_BY_SUB_CATEGORY_ID(state,reportsBySubCategoryId){
            state.reportsBySubCategoryId=reportsBySubCategoryId
        },
        DELETE_REPORT(state,reportId) {

            const activeReportIndex=state.activeReports.findIndex(r=>r._id===reportId)
            if(activeReportIndex >=0){
                state.activeReports.splice(activeReportIndex,1)
                state.activeReportsCount=state.activeReports.length
            }
            const waitingReportIndex=state.waitingReports.findIndex(r=>r._id===reportId)
            if(waitingReportIndex >=0){
                state.waitingReports.splice(waitingReportIndex,1)
                state.waitingReportsCount=state.waitingReports.length
            }
            const solvedReportsIndex=state.solvedReports.findIndex(r=>r._id===reportId)
            if(solvedReportsIndex >=0){
                state.solvedReports.splice(solvedReportsIndex,1)
                state.solvedReportsCount=state.solvedReports.length
            }
        },
        INIT_REPORT(state,report){
            state.report=report
        },
        OPEN_REPORT(state,reportId){
            const reportIndex=state.waitingReports.findIndex(r=>r._id===reportId)
            if(reportIndex >=0){
                state.waitingReports.splice(reportIndex,1)
                state.waitingReportsCount=state.waitingReports.length
                state.activeReportsCount++
            }
        },
        CLOSE_REPORT(state,reportId){
            const reportIndex=state.activeReports.findIndex(r=>r._id===reportId)
            if(reportIndex >=0){
                state.activeReports.splice(reportIndex,1)
                state.activeReportsCount=state.activeReports.length
                state.solvedReportsCount++
            }
            const employeeReportIndex=state.employeeActiveReports.findIndex(r=>r._id===reportId)
            if(employeeReportIndex >=0){
                state.employeeActiveReports.splice(employeeReportIndex,1)
                state.employeeActiveReportsCount=state.employeeActiveReports.length
                state.employeeSolvedReportsCount++

            }
        },
        SELECT_CATEGORY(state,categoryInfo){
            state.selectCategory=categoryInfo
        },
        INIT_EMPLOYEE_ACTIVE_REPORTS(state,activeReports){
            state.employeeActiveReports=activeReports
        },
        INIT_EMPLOYEE_SOLVED_REPORTS(state,solvedReports){
            state.employeeSolvedReports=solvedReports
        },
/*        PUBIC_REPORTS_CHANGE_PAGINATION(state, page) {
            state.publicReportQueryProps.pagination.page = page
        },

        RESET_PUBLIC_REPORT_PAGINATION_CARD_INFO_ACTIVE_PAGE(state){
            state.publicReportPaginationCardInfo.activePage=1
        },*/

        PUBIC_REPORTS_CHANGE_PAGINATION_CARD_INFO(state, paginationInfo) {
            state.publicReportPaginationCardInfo= paginationInfo
        },


    },
    actions: {
   /*     initReports:async ({commit})=>{
            try{
                const res=await  axios.get("reports/all-reports")

                console.log(res.data.allReports)
                commit("INIT_REPORTS",res.data.allReports)

            }catch (err) {
                console.log(err.response)
            }
        },*/
        initEmployeeActiveReportsCount:async ({commit},employeeId)=>{
            try{
                const res=await  axios.get(`reports/navbar-report-counts?s=1&e=${employeeId}`)
                console.log(res)
                commit("INIT_EMPLOYEE_ACTIVE_REPORTS_COUNT",res.data.navbarReportCounts)

            }catch (err) {
                console.log(err.response)
            }
        },
        initEmployeeSolvedReportsCount:async ({commit},employeeId)=>{
            try{
                const res=await  axios.get(`reports/navbar-report-counts?s=2&e=${employeeId}`)
                console.log(res)
                commit("INIT_EMPLOYEE_SOLVED_REPORTS_COUNT",res.data.navbarReportCounts)

            }catch (err) {
                console.log(err.response)

            }
        },
        initActiveReportsByCategoryCount:async ({commit},categoryId)=>{
            try{
                const res=await  axios.get(`reports/navbar-report-counts?s=1&c=${categoryId}`)
                console.log(res)
                commit("INIT_ACTIVE_REPORTS_COUNT",res.data.navbarReportCounts)

            }catch (err) {
                console.log(err.response)
            }
        },
        initSolvedReportsByCategoryCount:async ({commit},categoryId)=>{
            try{
                const res=await  axios.get(`reports/navbar-report-counts?s=2&c=${categoryId}`)
                console.log(res)
                commit("INIT_SOLVED_REPORTS_COUNT",res.data.navbarReportCounts)

            }catch (err) {
                console.log(err.response)

            }
        },
        initWaitingReportsByCategoryCount:async ({commit},categoryId)=>{
            try{
                const res=await  axios.get(`reports/navbar-report-counts?s=0&c=${categoryId}`)
                console.log(res)
                commit("INIT_WAITING_REPORTS_COUNT",res.data.navbarReportCounts)
            }catch (err) {
                console.log(err.response)
            }
        },
        initActiveReportsCount:async ({commit})=>{
            try{
                const res=await  axios.get(`reports/navbar-report-counts?s=1`)
                console.log(res)
                commit("INIT_ACTIVE_REPORTS_COUNT",res.data.navbarReportCounts)

            }catch (err) {
                console.log(err.response)
            }
        },
        initSolvedReportsCount:async ({commit})=>{
            try{
                const res=await  axios.get(`reports/navbar-report-counts?s=2`)
                console.log(res)
                commit("INIT_SOLVED_REPORTS_COUNT",res.data.navbarReportCounts)

            }catch (err) {
                console.log(err.response)

            }
        },
        initWaitingReportsCount:async ({commit})=>{
            try{
                const res=await  axios.get(`reports/navbar-report-counts?s=0`)
                console.log(res)
                commit("INIT_WAITING_REPORTS_COUNT",res.data.navbarReportCounts)
            }catch (err) {
                console.log(err.response)
            }
        },
        initActiveReports:async ({commit})=>{
            try{
                const res=await  axios.get("reports/all-active-reports")
                console.log(res)
                commit("INIT_ACTIVE_REPORTS",res.data.activeReports)

            }catch (err) {
                console.log(err.response)
            }
        },
        initSolvedReports:async ({commit})=>{
            try{
                const res=await  axios.get("reports/all-solved-reports")
                console.log(res)
                commit("INIT_SOLVED_REPORTS",res.data.solvedReports)

            }catch (err) {
                console.log(err.response)

            }
        },
        initWaitingReports:async ({commit})=>{
            try{
                const res=await  axios.get("reports/all-waiting-reports")
                console.log(res)
                commit("INIT_WAITING_REPORTS",res.data.waitingReports)
            }catch (err) {
                console.log(err.response)
            }
        },

        initEmployeeActiveReports:async ({commit},employeeId)=>{
            try{
                const res=await  axios.get(`reports/active-reports-by-employee-id/${employeeId}`)
                console.log(res)
                commit("INIT_EMPLOYEE_ACTIVE_REPORTS",res.data.employeeActiveReports)

            }catch (err) {
                console.log(err.response)
            }
        },
        initEmployeeSolvedReports:async ({commit},employeeId)=>{
            try{
                const res=await  axios.get(`reports/solved-reports-by-employee-id/${employeeId}`)
                console.log(res)
                commit("INIT_EMPLOYEE_SOLVED_REPORTS",res.data.employeeSolvedReports)

            }catch (err) {
                console.log(err.response)

            }
        },

        initCategoryActiveReports:async ({commit},categoryId)=>{
            try{
                const res=await  axios.get(`reports/active-reports-by-category-id/${categoryId}`)
                console.log(res)
                commit("INIT_ACTIVE_REPORTS",res.data.categoryActiveReports)

            }catch (err) {
                console.log(err.response)
            }
        },
        initCategorySolvedReports:async ({commit},categoryId)=>{
            try{
                const res=await  axios.get(`reports/solved-reports-by-category-id/${categoryId}`)
                console.log(res)
                commit("INIT_SOLVED_REPORTS",res.data.categorySolvedReports)

            }catch (err) {
                console.log(err.response)
            }
        },
        initCategoryWaitingReports:async ({commit},categoryId)=>{
            try{
                const res=await  axios.get(`reports/waiting-reports-by-category-id/${categoryId}`)
                console.log(res)
                commit("INIT_WAITING_REPORTS",res.data.categoryWaitingReports)

            }catch (err) {
                console.log(err.response)

            }
        },
        initReport:async ({commit},reportId)=>{
            try{
                console.log(reportId)
                const res=await  axios.get(`reports/${reportId}`)

                console.log(res.data)
                commit("INIT_REPORT",res.data.report)
            }catch (err) {
                console.log("erora girdi")
                console.log(err.response)
            }


        },
        initPublicReports:async  ({commit},query)=>{
            try{
              console.log(query)
         /*       const filter = JSON.stringify(state.publicReportQueryProps.filter)
                const pagination = JSON.stringify(state.publicReportQueryProps.pagination)*/
                const res=await  axios.get(`reports/public-reports?q=${query.q}&s=${query.s}&p=${query.p}&l=${query.l}`)

                console.log(res.data.publicReports)
                commit("INIT_PUBLIC_REPORTS",res.data.publicReports)
                commit("PUBIC_REPORTS_CHANGE_PAGINATION_CARD_INFO",res.data.paginationInfo)

            }catch (err) {
                console.log(err.response)
            }


        },
        initReportBySubCategoryId:async  ({commit},query)=>{
            try{
             /*   const filter = JSON.stringify(state.publicReportQueryProps.filter)
                const pagination = JSON.stringify(state.publicReportQueryProps.pagination)*/
                const res=await  axios.get(`reports/reports-by-sub-category/${query.subCategoryId}?q=${query.q}&s=${query.s}&p=${query.p}&l=${query.l}`)
                console.log(res)
                console.log(res.data.publicReports)
                commit("INIT_REPORTS_BY_SUB_CATEGORY_ID",res.data.reportsBySubCategory)
                commit("PUBIC_REPORTS_CHANGE_PAGINATION_CARD_INFO",res.data.paginationInfo)

            }catch (err) {
                console.log(err.response)
            }


        },
        newReport:async ({commit},newReportInfo)=>{
            try{

                const res=await  axios.post("reports/new-report",newReportInfo,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
              console.log(res.data)
        /*        commit("NEW_REPORT",res.data.allReports)*/
                commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
              await  router.push({name:"report-detail",params:{reportId:res.data.newReport._id}})


            }catch (err) {


                commit("INIT_MESSAGE",{message:err.response.data.message,color:"danger"})
            }
        },
        openReport:async ({commit},reportId)=>{
            try{
                const res=await  axios.get(`reports/${reportId}/open-report`)
                console.log(res.data)
                commit("OPEN_REPORT",reportId)
                commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
            }catch (err) {
                console.log(err.response)
                commit("INIT_MESSAGE",{message:err.response.data.message,color:"danger"})
            }
        },
        closeReport:async ({commit},reportInfo)=>{
            try{
                const res=await  axios.post(`reports/${reportInfo.reportId}/close-report`, reportInfo.closeReportForm)
                commit("CLOSE_REPORT",reportInfo.reportId)
                commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
            }catch (err) {
                console.log(err.response)
                console.log(err)
                commit("INIT_MESSAGE",{message:err.response.data.message,color:"danger"})
            }
        },
        deleteReport:async ({commit},reportId)=>{
            try{

                await  axios.delete(`reports/delete-report/${reportId}`)

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
        getReport:state=>state.report,
        getPublicReports:state=>state.publicReports,
        getEmployeeSolvedReportsCount:state=>state.employeeSolvedReportsCount,
        getEmployeeActiveReportsCount:state=>state.employeeActiveReportsCount,
        getSolvedReportsCount:state=>state.solvedReportsCount,
        getActiveReportsCount:state=>state.activeReportsCount,
        getWaitingReportsCount:state=>state.waitingReportsCount,
        getActiveReports:state=>state.activeReports,
        getSolvedReports:state=>state.solvedReports,
        getWaitingReports:state=>state.waitingReports,
        getEmployeeActiveReports:state=>state.employeeActiveReports,
        getEmployeeSolvedReports:state=>state.employeeSolvedReports,
        getPublicReportsPaginationCardInfo:state=>state.publicReportPaginationCardInfo,
        getActivePage:state=>state.publicReportPaginationCardInfo.activePage || 1,
        getReportsBySubCategory:state=>state.reportsBySubCategoryId,
    }
}

export default reportStore