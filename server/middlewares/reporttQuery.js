import {
    filterQueryMethod,
    sortQueryMethod,
    paginationQueryMethod,
} from '../util/query'
import ReportModel from '../models/report'
import CustomError from "../util/CustomError";


 export default   async (req, res, next) => {
        try {
            let searchCount,query

             query=ReportModel.find({public:true,status:{$ne:0}},{user:0})
            const filterObject = filterQueryMethod(query, req) //search query
            searchCount= await ReportModel.find({public:true,status:{$ne:0}}).where(filterObject.search).countDocuments()
            query = filterObject.query
            query=sortQueryMethod(req,query)
            const paginationObject = paginationQueryMethod(
                searchCount,
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


