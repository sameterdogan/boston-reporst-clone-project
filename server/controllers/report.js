import ReportModel from "../models/report"
import DeviceDetector from "device-detector-js";

const deviceDetector = new DeviceDetector();

import CustomError from "../util/CustomError";

export const getAllActiveReports = async (req, res, next) => {
    const activeReports = await ReportModel.find({status: 1}).sort({openingDate:'desc'}).lean()
    res.status(200).json({
        success: true,
        message: "Aktif bütün şikayetler listelendi.",
        activeReports
    })
}
export const getAllSolvedReports = async (req, res, next) => {
    const solvedReports = await ReportModel.find({status: 2}).sort({closingDate:'desc'}).lean()
    res.status(200).json({
        success: true,
        message: "Çözülen bütün şikayetler listelendi.",
        solvedReports
    })
}
export const getAllWaitingReports = async (req, res, next) => {
    const waitingReports = await ReportModel.find({status: 0}).sort({createdAt:'desc'}).lean()
    res.status(200).json({
        success: true,
        message: "Bekleyen bütün şikayetler listelendi.",
        waitingReports
    })
}
export const getReportById = async (req, res, next) => {
    try{
        const report = await ReportModel.findById(req.params.reportId)
        if(!report) return next( new CustomError("Şikayet bulunamadı.",404))

        res.status(200).json({
            success: true,
            message: "Şikayet başarıyla getirildi.",
            report
        })
    }catch (err){
        next(err)
    }

}
export const getReportsBySubCategoryId = async (req, res, next) => {
    const reportsBySubCategory = await req.getReportsQuery.lean()
    res.status(200).json({
        success: true,
        message: "Kategoriye göre  Halka açık şikayetler listelendi",
        reportsBySubCategory,
        paginationInfo: req.paginationInfo
    })
}
export const getActiveReportsByEmployeeId=async (req,res,next)=>{
    try{
        const employeeActiveReports=await ReportModel.find({employee:req.params.employeeId,status:1}).sort({openingDate:'desc'}).lean()
        res.status(200).json({
            success:true,
            message:"Personele atanan aktif şikayetler getirildi.",
            employeeActiveReports
        })
    }catch (err){
        next(err)
    }

}
export const getSolvedReportsByEmployeeId=async (req,res,next)=>{
    try{
        const employeeSolvedReports=await ReportModel.find({employee:req.params.employeeId,status:2}).sort({openingDate:'desc'}).lean()
        res.status(200).json({
            success:true,
            message:"Personele atanan kapanmış şikayetler getirildi.",
            employeeSolvedReports
        })
    }catch (err){
        next(err)
    }

}

export const getActiveReportsByCategoryId=async (req,res,next)=>{
    try{
        const categoryActiveReports=await ReportModel.find({category:req.params.categoryId,status:1}).sort({openingDate:'desc'}).lean()
        res.status(200).json({
            success:true,
            message:"Kategoriye göre aktif şikayetler getirildi.",
            categoryActiveReports
        })
    }catch (err){
        next(err)
    }
}
export const getSolvedReportsByCategoryId=async (req,res,next)=>{
    try{
        const categorySolvedReports=await ReportModel.find({category:req.params.categoryId,status:2}).sort({openingDate:'desc'}).lean()
        res.status(200).json({
            success:true,
            message:"Kategoriye göre  kapanmış şikayetler getirildi.",
            categorySolvedReports
        })
    }catch (err){
        next(err)
    }
}
export const getWaitingReportsByCategoryId=async (req,res,next)=>{
    try{
        const categoryWaitingReports=await ReportModel.find({category:req.params.categoryId,status:0}).sort({openingDate:'desc'}).lean()
        res.status(200).json({
            success:true,
            message:"Kategoriye göre  bekleyen şikayetler getirildi.",
            categoryWaitingReports
        })
    }catch (err){
        next(err)
    }
}
export const getPublicReports = async (req, res, next) => {
    try{
        const publicReports = await req.getReportsQuery.lean()
        res.status(200).json({
            success: true,
            message: "Halka açık şikayetler listelendi",
            publicReports,
            paginationInfo: req.paginationInfo
        })
    }catch (err){
        next(err)
    }

}
export const getPrivateReports = async (req, res, next) => {

    try{
        const privateReports = await req.getReportsQuery.lean()
        res.status(200).json({
            success: true,
            message: "Halka kapalı şikayetler listelendi",
            privateReports
        })
    }catch (err){
        next(err)
    }

}

export const newReport = async (req, res, next) => {
    try {
        const reportInfo = {
            category: req.body.category,
            subCategory: req.body.subCategory,
            title: req.body.title,
            description: req.body.description,
            location: {
                province:req.body.province,
                district: req.body.district,
                neighborhood: req.body.neighborhood,
                street: req.body.street,
                address:req.body.address,
                lat:req.body.lat,
                lng:req.body.lng

            },
            user: {
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                name: req.body.name || undefined,
                surname: req.body.surname || undefined,
                email: req.body.email || undefined,
                phone: req.body.phone || undefined
            },
            public: req.body.public
        }
        if (req.files) {
            reportInfo.images = req.body.images.map(image => {
                return {thumbnail: image.thumbnail, image: image.image}
            })

        }
        const userAgent = req.useragent.source;
        const device = deviceDetector.parse(userAgent);
        const newReport = await ReportModel.create(reportInfo)
        if(device && device.device && device.device.brand){
            newReport.notes.push({description:`${device.device.brand} aracılığıyla gönderilmiştir.`})
          await  newReport.save()
        }



        res.status(200).json({
            success: true,
            message: "Şikayet başarıyla oluşturuldu.",
            newReport
        })
    } catch (err) {
        console.log(err)
    }

}
export const deleteReport = async (req, res, next) => {
    try {
        const deleteReport = await ReportModel.deleteOne({_id:req.params.reportId})
        res.status(200).json({
            success: true,
            message: "şikayet başarıyla silinmiştir."
        })
    } catch (err) {
        next(err)
    }
}
export const reportOpen = async (req, res, next) => {
    try {
        const openedReport = await ReportModel.findById(req.params.reportId)
        openedReport.status = 1
        openedReport.openingDate= Date.now()
        openedReport.notes.push({description: "Açıldı"})
        openedReport.save()
        res.status(200).json({
            success: true,
            message: "Şikayet aktif olarak güncelendi",
            openedReport
        })
    } catch (err) {
      next(err)
    }
}
export const reportClose = async (req, res, next) => {
    try {

        const closedReport = await ReportModel.findById(req.params.reportId)
        closedReport.notes.push({description: "Şikayet Kapatıldı."})
        closedReport.status = 2
        closedReport.closingDate=Date.now()
        closedReport.response.description=req.body.description
        closedReport.response.images={}
        console.log(Date.now()-closedReport.openingDate)
        var date = new Date(Date.now()-closedReport.openingDate);
        console.log(date)
        closedReport.responseTime=date.getTime() / 1000; //1440516958
        if (req.files) {
            closedReport.response.images = req.body.images.map(image => {
                return {thumbnail: image.thumbnail, image: image.image}
            })
        }
        closedReport.save()

        res.status(200).json({
            success: true,
            message: "Şikayet kapatıldı.",
            closedReport
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
export const counts=async (req,res,next)=>{

    try{
        const countSearch={public:true,title: new RegExp(req.query.q || "", 'gi')}
        if(req.query.c){
            countSearch["subCategory"]=req.query.c
        }
        if(req.query.s && req.query.s!=0){
            countSearch["status"]=req.query.s
        }else{
            countSearch["status"]={$ne:0}
        }
        const count=await ReportModel.countDocuments(countSearch)
        res.status(200).json({
            count
        })
    }catch (err){
         next(err)
    }


}
export const navbarReportCounts=async (req,res,next)=>{

    try{
        const countSearch={}
        if(req.query.c){
            countSearch["category"]=req.query.c
        }
        if(req.query.e){
            countSearch["employee"]=req.query.e
        }
        if(req.query.s){
            countSearch["status"]=req.query.s
        }
        const navbarReportCounts=await ReportModel.countDocuments(countSearch)
        res.status(200).json({
            navbarReportCounts
        })
    }catch (err){
        next(err)
    }


}

export const getReportsById=async (req,res,next)=>{
    try{
        const getReportsById=await ReportModel.find({_id:{$in:req.body.reportsIdArray}}).sort({openingDate:'desc'}).lean()
        res.status(200).json({
            success:true,
            message:"Numarası verilen  şikayetleri getirildi.",
            getReportsById
        })
    }catch (err){
        next(err)
    }
}

export const reportCategoryStatistics=async (req,res,next)=> {
    try{
        const statistics = await ReportModel.aggregate([
            // stage 1: join subcategories
            {
                $lookup: {
                    from: 'categories',      // collection to join
                    localField: 'category',          // field from categories collection
                    foreignField: '_id', // field from  collection
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $group:
                    {
                        _id: "$category" ,
                        totalCount: { $sum: 1 },
                    }
            }
        ])
        return res.status(200).json({
            success:true,
            statistics,
            message:"Kategoriye göre dağılım istatiği döndü."
        })
    }catch (err){
        next(err)
    }


}
export const reportSubCategoryStatistics=async (req,res,next)=> {
    try{
        const statistics = await ReportModel.aggregate([
            // stage 1: join subcategories
            {
                $lookup: {
                    from: 'subcategories',      // collection to join
                    localField: 'subCategory',          // field from categories collection
                    foreignField: '_id', // field from  collection
                    as: 'subCategory'
                }
            },
            {
                $unwind: '$subCategory'
            },
            {
                $group:
                    {
                        _id: "$subCategory" ,
                        totalCount: { $sum: 1 },
                    }
            }
        ])
        return res.status(200).json({
            success:true,
            statistics,
            message:"Alt kategoriye göre dağılım istatistiği döndü."
        })
    }catch (err){
        next(err)
    }


}

export const reportSolvedCategoryStatistics=async (req,res,next)=> {
    try{
        const statistics = await ReportModel.aggregate([
            // stage 1: join subcategories
            {
                $project : {"category"      : 1,
                    "responseTime" : 1,
                    "status": 1,
                    "year": { $year: "$created_at" },
                    "month": { $month: "$created_at" },
                    "day": { $dayOfMonth: "$created_at" },
                    "value": "$value"
                }
            },
            { $match : { status : 2 } },
            {
                $lookup: {
                    from: 'categories',      // collection to join
                    localField: 'category',          // field from categories collection
                    foreignField: '_id', // field from  collection
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $group:
                    {
                        _id: "$category" ,
                        totalCount: { $sum: 1 },
                    }
            }
        ])
        return res.status(200).json({
            success:true,
            statistics,
            message:"Sonuçlanan şikayetlerin kategoriye göre dağılım istatistiği döndü."
        })
    }catch (err){
        next(err)
    }


}

export const reportDistrictStatistics=async (req,res,next)=> {
    try{
        const statistics = await ReportModel.aggregate([
            {
                $group:
                    {
                        _id: "$location.district" ,
                        totalCount: { $sum: 1 },
                    }
            }
        ])
        return res.status(200).json({
            success:true,
            statistics,
            message:"İlçelere göre dağılım istatistiği döndü."
        })
    }catch (err){
        next(err)
    }


}


export const reportResponseTimeCategoryStatistics=async (req,res,next)=> {
    const statistics = await ReportModel.aggregate([
        { $match : { status : 2 } },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        },
        {
            $group:
                {
                    _id: "$category" ,
                    avgValue: { $avg: "$responseTime" }
                }
        }
    ])
    return res.status(200).json({
        success:true,
        statistics,
        message:"Sonuçlanan şikayetlerin kategoriye göre dağılım istatistiği döndü."
    })
}