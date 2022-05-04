import TransferModel from "../models/transfer"
import ReportModel from "../models/report";
import CustomError from "../util/CustomError";

export const  newTransfer =async (req,res,next)=>{
    try{
        const transferInfo={report:req.body.reportId, employee:req.body.employeeId}
        const report= await ReportModel.findById(req.body.reportId)
        if(!report) return next(new CustomError("Şikayet bulunamadı.",404))
        if(report.transfer!==undefined) return  next(new CustomError("Bu şikayete daha önce atama yapılmış.",400))
        const newTransfer=await TransferModel.create(transferInfo)
        report.transfer=newTransfer._id
        report.status = 1
        report.openingDate= Date.now()
        report.notes.push({description: "Açıldı"})
        report.employee=req.body.employeeId
        await report.save()

        res.status(201).json({
            success:true,
            message:"Rapor başarıyla atandı ve halka açıldı..",
            newTransfer
        })
    }catch (err){
        next(err)
    }


}



export const  getTransferById =async (req,res,next)=>{
    try{

        const transfer= await TransferModel.findById(req.params.transferId).populate([{path:"employee"},{path:"report"}])
        if(!transfer) return next(new CustomError("Transfer bulunamadı.",404))

        res.status(201).json({
            success:true,
            message:"Transfer bilgileri başarıyla atandı.",
            transfer
        })
    }catch (err){
        next(err)
    }


}





