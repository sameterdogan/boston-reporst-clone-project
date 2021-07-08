import {
    filterQueryMethod,
    sortQueryMethod,
    paginationQueryMethod,
} from '../util/query'
import ReportModel from '../models/report'
import CustomError from "../util/CustomError";

export default  function (isPublic) {
    return async (req, res, next) => {
        try {
            let searchCount, defaultCount,query
            if(isPublic===true){
                 query = ReportModel.find({public:true})
            }else{
                 query = ReportModel.find({public:false})
            }

            const filterKeys = ['status', 'title']
            const filterObject = filterQueryMethod(filterKeys, query, req) //search query
            if (filterObject.filter) {
                searchCount = await ReportModel.countDocuments(filterObject.filter)
            } else {
                defaultCount = await ReportModel.countDocuments()
            }

            query = filterObject.query
            req.getReportsQuery = query

            next()
        } catch (err) {
            next(err)
        }
    }
}

