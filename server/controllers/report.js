import ReportModel from "../models/report"

export const newReport=async (req,res,next)=>{
    const reportInfo={
       category:req.body.category,
        subCategory:req.body.category,
        address:req.body.address
    }
    console.log(req.images)
    if(req.body.user) reportInfo["user"]=req.body.user
    const newReport = await ReportModel.create()
    res.status(200).json({
        success:true,
        message:"Şikayet başarıyla oluşturuldu.",
        newReport
    })
}