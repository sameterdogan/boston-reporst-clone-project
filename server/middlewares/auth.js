import AdminModel from "../models/admin"
import jwt from "jsonwebtoken"


export const isAdmin =async (req,res,next)=>{
    try {
        const cookie=req.cookies["jwt"]
        console.log(cookie)
        if(!cookie){
            return res.status(401).json({
                success:false,
                message:"Bu alana giriş yetkiniz bulunmuyor."
            })
        }
        const claims= jwt.verify(cookie,process.env.JWT_SECRET_KEY)
        if(!claims){
            return res.status(401).json({
                success:false,
                message:"Bu alanı giriş yetkiniz bulunmuyor."
            })
        }
        const admin=await  AdminModel.findOne({_id:claims._id})
        admin.password=undefined
        req.admin=admin
        next()
    }catch (err){
      res.status(403).json({
          success:false,
          message:"Oturum süresi sona ermiş."
      })
    }
}