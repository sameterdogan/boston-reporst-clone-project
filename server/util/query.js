import CustomError from "./CustomError";

export const filterQueryMethod = (query, req) => {


    const search={title: new RegExp(req.query.q || "", 'gi')}
    if(!req.query.s || req.query.s==0){
           search["status"]={$ne:0}
    }else{
        search["status"]=req.query.s
    }

    query = query.where(search)
    return { query, search }
}

export const sortQueryMethod = (req, query) => {
    query = query.sort({openingDate:'desc'})
    return query
}

export const paginationQueryMethod = (count, req, query) => {

    const page = Number(req.query.p) || 1
    const limit = Number(req.query.l) || 3

    let paginationObject = {}
    paginationObject.totalPage = Math.ceil(count / limit)

    const startIndex = (page - 1) * limit;

    const endIndex = page * limit
    if (endIndex < count) {
        paginationObject.next = {
            page: page + 1,
            limit: limit
        }

    }
    if (startIndex > 0) {
        paginationObject.previous = {
            page: page - 1,
            limit: limit
        }
    }
    paginationObject.activePage=page

        paginationObject['query'] = query.skip(startIndex).limit(limit)


    return paginationObject
}