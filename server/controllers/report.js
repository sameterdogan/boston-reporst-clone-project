import ReportModel from "../models/report"


import CustomError from "../util/CustomError";

export const getAllActiveReports = async (req, res, next) => {
    const activeReports = await ReportModel.find({status: 1}).lean()
    res.status(200).json({
        success: true,
        message: "Aktif bütün şikayetler listelendi.",
        activeReports
    })
}
export const getAllSolvedReports = async (req, res, next) => {
    const solvedReports = await ReportModel.find({status: 2}).lean()
    res.status(200).json({
        success: true,
        message: "Çözülen bütün şikayetler listelendi.",
        solvedReports
    })
}
export const getAllWaitingReports = async (req, res, next) => {
    const waitingReports = await ReportModel.find({status: 0}).lean()
    res.status(200).json({
        success: true,
        message: "Bekleyen bütün şikayetler listelendi.",
        waitingReports
    })
}
export const getReportById = async (req, res, next) => {
    const report = await ReportModel.findById(req.params.reportId)
    if(!report) return new CustomError("Şikayet bulunamadı.",404)
    res.status(200).json({
        success: true,
        message: "Şikayet başarıyla getirildi.",
        report
    })
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

export const getPublicReports = async (req, res, next) => {
    const publicReports = await req.getReportsQuery.lean()
    res.status(200).json({
        success: true,
        message: "Halka açık şikayetler listelendi",
        publicReports,
        paginationInfo: req.paginationInfo
    })
}
export const getPrivateReports = async (req, res, next) => {
    const privateReports = await req.getReportsQuery.lean()
    res.status(200).json({
        success: true,
        message: "Halka kapalı şikayetler listelendi",
        privateReports
    })
}

export const newReport = async (req, res, next) => {
    try {
        console.log(req.body)
        const reportInfo = {
            category: req.body.category,
            subCategory: req.body.subCategory,
            title: req.body.title,
            description: req.body.description,
            location: {
                district: req.body.district,
                neighborhood: req.body.neighborhood,
                street: req.body.street
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


        /*if(req.body.user) reportInfo["user"]=req.body.user*/
        const newReport = await ReportModel.create(reportInfo)

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
        const deleteReport = await ReportModel.findByIdAndDelete(req.params.reportId)
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
        closedReport.notes.push({description: req.body.description})
        closedReport.status = 2
        closedReport.closingDate=Date.now()
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
/*export const counts=async (req,res,next)=>{
  const categoryCounts=await  ReportModel.aggregate([
      {$group : {_id:"$subCategory", count:{$sum:1}}},
      {$lookup: {from: "SubCategory", localField: "subCategory", foreignField: "_id", as: "subCategoryDoc"}}
])
    res.status(200).json({
        categoryCounts
    })
}*/
export const counts=async (req,res,next)=>{

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
}
