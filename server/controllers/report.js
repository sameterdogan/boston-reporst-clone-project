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
        console.log(req.body)
        const reportInfo={
            category:req.body.category,
            subCategory:req.body.subCategory,
            location:{
                district:req.body.district,
                neighborhood:req.body.neighborhood,
                street:req.body.street
            },
            user:{
                name:req.body.name,
                surname:req.body.surname,
                email:req.body.email,
                phone:req.body.phone
            },
        }
        if(req.files){
            reportInfo.images=req.files.map(file=>{
                return file.filename
            })
        }


        if(req.body.user) reportInfo["user"]=req.body.user
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