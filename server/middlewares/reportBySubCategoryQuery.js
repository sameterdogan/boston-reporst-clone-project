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

        query=ReportModel.find({public:true,status:{$ne:0},subCategory:req.params.subCategoryId})
        const filterKeys = ['status', 'title']
        const filterObject = filterQueryMethod(filterKeys, query, req) //search query
        if (filterObject.filter) {
            filterObject.filter["public"]=true
            filterObject.filter["subCategory"]=req.params.subCategoryId
            console.log(filterObject.filter["status"]+"asd")
            console.log(typeof filterObject.filter["status"])
            if(!filterObject.filter["status"] || filterObject.filter["status"] && filterObject.filter["status"]===0   ){
                console.log("geldii")
                    filterObject.filter["status"]={$ne:0}
            }
            console.log(filterObject.filter)
            searchCount = await ReportModel.countDocuments(filterObject.filter)
        } else {
            defaultCount = await ReportModel.countDocuments({public:true,status:{$ne:0},subCategory:String(req.params.subCategoryId) })
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


