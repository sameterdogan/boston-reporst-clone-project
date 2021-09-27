import axios from "axios";



const statisticsStore = {
    state: {
        categoryReportsChartData:{},
        subCategoryReportsChartData:{},
        solvedReportsChartData:{},
        districtReportsChartData:{},
        responseTimeReportsChartData:{}
    },
    mutations: {
        INIT_CATEGORY_REPORTS_CHART_DATA(state,categoryReportsChartData){

            state.categoryReportsChartData.labels=categoryReportsChartData.map(d=>{
                return d._id.category

            })
            state.categoryReportsChartData.data=categoryReportsChartData.map(d=>{
                return d.totalCount

            })
            state.categoryReportsChartData.backgroundColor=categoryReportsChartData.map(()=>{
                const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
                const r = randomBetween(0, 255);
                const g = randomBetween(0, 255);
                const b = randomBetween(0, 255);
                return `rgb(${r},${g},${b})`;
            })
        },
        INIT_SUB_CATEGORY_REPORTS_CHART_DATA(state,subCategoryReportsChartData){
            state.subCategoryReportsChartData.labels=subCategoryReportsChartData.map(d=>{
                return d._id.subCategory

            })
            state.subCategoryReportsChartData.data=subCategoryReportsChartData.map(d=>{
                console.log("geldii1")

                return d.totalCount
            })
            state.subCategoryReportsChartData.backgroundColor=subCategoryReportsChartData.map(()=>{

                const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
                const r = randomBetween(0, 255);
                const g = randomBetween(0, 255);
                const b = randomBetween(0, 255);

                return `rgb(${r},${g},${b})`;
            })

        },
        INIT_SOLVED_REPORTS_CHART_DATA(state,solvedReportsChartData){
            state.solvedReportsChartData.labels=solvedReportsChartData.map(d=>{
                return d._id.category
            })
            state.solvedReportsChartData.data=solvedReportsChartData.map(d=>{
                return d.totalCount
            })
            state.solvedReportsChartData.backgroundColor=solvedReportsChartData.map(()=>{
                const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
                const r = randomBetween(0, 255);
                const g = randomBetween(0, 255);
                const b = randomBetween(0, 255);
                return `rgb(${r},${g},${b})`;
            })

        },
        INIT_DISTRICT_REPORTS_CHART_DATA(state,districtReportsChartData){
            console.log(districtReportsChartData)
            state.districtReportsChartData.labels=districtReportsChartData.map(d=>{
                return d._id
            })
            state.districtReportsChartData.data=districtReportsChartData.map(d=>{
                return d.totalCount
            })
            state.districtReportsChartData.backgroundColor=districtReportsChartData.map(()=>{
                const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
                const r = randomBetween(0, 255);
                const g = randomBetween(0, 255);
                const b = randomBetween(0, 255);
                return `rgb(${r},${g},${b})`;
            })

        },


        INIT_RESPONSE_TIME_REPORTS_CHART_DATA(state,responseTimeReportsChartData){

            state.responseTimeReportsChartData.labels=responseTimeReportsChartData.map(d=>{
                return d._id.category
            })
            state.responseTimeReportsChartData.data=responseTimeReportsChartData.map(d=>{

                    d = Number(d.avgValue);
                    var h = Math.floor(d / 3600);
                    var m = Math.floor(d % 3600 / 60);
                    var s = Math.floor(d % 3600 % 60);

                    var hDisplay = h > 0 ? h + (h == 1 ? " saat, " : "") : "";
                    var mDisplay = m > 0 ? m + (m == 1 ? " dakika, " : "") : "";
                    var sDisplay = s > 0 ? s + (s == 1 ? " saniye" : "") : "";
                    let date;
                    if(sDisplay) date=sDisplay
                    if(mDisplay) date=mDisplay
                    if(hDisplay) date=hDisplay
                console.log( hDisplay + mDisplay + sDisplay)
                console.log(typeof hDisplay )
                console.log(typeof mDisplay )
                console.log(typeof sDisplay )

                return date+""
            })
            state.responseTimeReportsChartData.backgroundColor=responseTimeReportsChartData.map(()=>{
                const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
                const r = randomBetween(0, 255);
                const g = randomBetween(0, 255);
                const b = randomBetween(0, 255);
                return `rgb(${r},${g},${b})`;
            })

        }
    },
    actions:{
         initCategoryReportsChartData:async ({commit})=>{
              try{
              const res=  await  axios.get("reports/report-category-statistics")
               commit("INIT_CATEGORY_REPORTS_CHART_DATA",res.data.statistics)
              }catch (e) {
                     console.log(e.response)
              }


          },
         initSubCategoryReportsChartData:async ({commit})=>{
            try{
                const res=  await  axios.get("reports/report-sub-category-statistics")
                commit("INIT_SUB_CATEGORY_REPORTS_CHART_DATA",res.data.statistics)
            }catch (e) {
                console.log(e.response)
            }


        },
         initSolvedReportsChartData:async ({commit})=>{
            try{
                const res=  await  axios.get("reports/report-solved-category-statistics")
                commit("INIT_SOLVED_REPORTS_CHART_DATA",res.data.statistics)

            }catch (e) {
                console.log(e.response)
            }


        },
         initDistrictReportsChartData:async ({commit})=>{
            try{
                const res=  await  axios.get("reports/report-district-statistics")
                console.log(res.data)
                commit("INIT_DISTRICT_REPORTS_CHART_DATA",res.data.statistics)

            }catch (e) {
                console.log(e.response)
            }


        },
         initResponseTimeReportsChartData:async ({commit})=>{
            try{
                const res=  await  axios.get("reports/report-response-time-category-statistics")
                console.log(res.data)
                commit("INIT_RESPONSE_TIME_REPORTS_CHART_DATA",res.data.statistics)

            }catch (e) {
                console.log(e.response)
            }


        }
    },
    getters: {
        getCategoryReportsCharData:state=>state.categoryReportsChartData,
        getSubCategoryReportsCharData:state=>state.subCategoryReportsChartData,
        getSolvedReportsCharData:state=>state.solvedReportsChartData,
        getDistrictReportsCharData:state=>state.districtReportsChartData,
        getResponseTimeChartData:state=>state.responseTimeReportsChartData
    },
}

export default statisticsStore