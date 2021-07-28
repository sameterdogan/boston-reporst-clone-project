import {
    filterQueryMethod,
    sortQueryMethod,
    paginationQueryMethod,
} from '../util/query'
import ReportModel from '../models/report'
import CustomError from "../util/CustomError";


 export default   async (req, res, next) => {
        try {
            let searchCount, defaultCount,query
  /*          const findQuery={}
            if(req.params.subCategoryId){
                console.log(req.params.subCategoryId)
                findQuery["subCategory"]=req.params.subCategoryId
            }*/
             query=ReportModel.find({public:true,status:{$ne:0}})
            const filterKeys = ['status', 'title']
            const filterObject = filterQueryMethod(filterKeys, query, req) //search query
            if (filterObject.filter) {
                filterObject.filter["public"]=true
               if(filterObject.filter["status"] && filterObject.filter["status"]===0){
                   filterObject.filter["status"]={$ne:0}
               }
                searchCount = await ReportModel.countDocuments(filterObject.filter)
            } else {
                defaultCount = await ReportModel.countDocuments({public:true,status:{$ne:0}})
            }

            query = filterObject.query
            query=sortQueryMethod(req,query)
            const paginationObject = paginationQueryMethod(
                searchCount || defaultCount,
                req,
                query
            )

            req.getReportsQuery = paginationObject.query
            paginationObject.query=undefined
            req.paginationInfo=paginationObject

            next()
        } catch (err) {
            next(err)
        }
    }


