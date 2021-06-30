import ReportModel from "../models/report"
var geoip = require('geoip-lite');
import DeviceDetector from "device-detector-js";

export const getAllReports=async (req,res,next)=>{
    const allReports=await ReportModel.find().populate("user")
    res.status(200).json({
        success:true,
        message:"Bütün şikayetler listelendi.",
        allReports
    })
}

export const newReport=async (req,res,next)=>{
    try{
        const reportInfo={
            category:req.body.category,
            subCategory:req.body.category,
            location:req.body.location
        }
        const deviceDetector = new DeviceDetector();
        const userAgent = req.get('User-Agent');
        const device = deviceDetector.parse(userAgent);


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