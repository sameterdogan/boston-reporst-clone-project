import ReportModel from "../models/report"
var geoip = require('geoip-lite');
import DeviceDetector from "device-detector-js";

export const getAllReports=async (req,res,next)=>{
    const allReports=await ReportModel.find().lean()
    res.status(200).json({
        success:true,
        message:"Bütün şikayetler listelendi.",
        allReports
    })
}
/*export const getReports=async (req,res,next)=>{
    const reports=await req.getReportsQuery.lean()
    res.status(200).json({
        success:true,
        message:" Şikayetler listelendi.",
        reports
    })
}*/

export const getPublicReports=async (req,res,next)=>{
    const publicReports=await req.getReportsQuery.lean()
    res.status(200).json({
        success:true,
        message:"Halka açık şikayetler listelendi",
        publicReports
    })
}

export const getPrivateReports=async (req,res,next)=>{
    const privateReports=await req.getReportsQuery.lean()
    res.status(200).json({
        success:true,
        message:"Halka kapalı şikayetler listelendi",
        privateReports
    })
}



export const newReport=async (req,res,next)=>{
    try{
        console.log( req.headers['x-forwarded-for'])
        const reportInfo={
            category:req.body.category,
            subCategory:req.body.subCategory,
            title:req.body.title,
            description:req.body.description,
            location:{
                district:req.body.district,
                neighborhood:req.body.neighborhood,
                street:req.body.street
            },
            user:{
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                name:req.body.name || undefined,
                surname:req.body.surname|| undefined,
                email:req.body.email|| undefined,
                phone:req.body.phone|| undefined
            },
        }
        if(req.files){
            reportInfo.images=req.body.images.map(image=>{
                return {thumbnail:image.thumbnail,image:image.image}
            })

        }


        /*if(req.body.user) reportInfo["user"]=req.body.user*/
        const newReport = await ReportModel.create(reportInfo)
        res.status(200).json({
            success:true,
            message:"Şikayet başarıyla oluşturuldu.",
            newReport
        })
    }catch (err){
        console.log(err)
    }

}

export const deleteReport=async (req,res,next)=>{
    try{
        const deleteReport=await ReportModel.findByIdAndDelete(req.params.reportId)
        res.status(200).json({
            success:true,
            message:"şikayet başarıyla silinmiştir."
        })
    }catch (err) {
         next(err)
    }
}