import AdminModel from "../models/admin"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const adminLogin = async (req, res, next) => {
    try{
        const admin = await AdminModel.findOne({email: req.body.email})
        if(!admin){
            return res.status(400).json({
                success:false ,
                message:"E-posta hesabına ait kullanıcı bulunamadı."
            })
        }
        console.log(admin)
        if(!await bcrypt.compare(req.body.password,admin.password)){
            return res.status(400).json({
                success:false ,
                message:"Şifre hatalı,kontrol edin."
            })
        }
        admin.password=undefined
        const token =await jwt.sign({_id:admin._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        })
        res.status(200).json({
            success:true,
            message:"Giriş işlemi başarılı",
            admin,
            token
        })
    }catch (err){
        console.log(err)
        next(err)
    }


}

export const adminLogut=async (req,res,next)=>{
       res.cookie("jwt","",{
           maxAge:0
       })
    res.status(200).json({
        success:true,
        message:"Çıkış işlemi başarıyla yapıldı"
    })
}


