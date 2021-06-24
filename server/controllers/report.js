import ReportModel from "../models/report"
var geoip = require('geoip-lite');


export const newReport=async (req,res,next)=>{
    try{
        const reportInfo={
            category:req.body.category,
            subCategory:req.body.category,
            location:req.body.location
        }
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