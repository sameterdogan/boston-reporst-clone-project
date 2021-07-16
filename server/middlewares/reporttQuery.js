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
             query=ReportModel.find({public:true})
            const filterKeys = ['status', 'title']
            const filterObject = filterQueryMethod(filterKeys, query, req) //search query
            if (filterObject.filter) {
                searchCount = await ReportModel.countDocuments(filterObject.filter)
            } else {
                defaultCount = await ReportModel.countDocuments({public:true})
            }

            query = filterObject.query
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


