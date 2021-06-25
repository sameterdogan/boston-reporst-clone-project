import ReportModel from "../models/report"
var geoip = require('geoip-lite');
import DeviceDetector from "device-detector-js";





export const newReport=async (req,res,next)=>{
    try{
        const reportInfo={
            category:req.body.category,
            subCategory:req.body.category,
            location:req.body.location
        }
        const deviceDetector = new DeviceDetector();
        console.log(req.get("User-Agent"))
        const userAgent = req.get('User-Agent');
        const device = deviceDetector.parse(userAgent);

        console.log(device);
console.log(req.body)
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