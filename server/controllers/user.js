import UserModel from "../models/user"
import AdminModel from "../models/admin"

export const newUser = async (req, res, next) => {
    const userInfo = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
    }
    try {
        const newUser = await UserModel.create(userInfo)

        res.status(201).json({
            success:true,
            message:"Yeni kullanıcı başarıyla oluşturuldu",
            newUser
        })
    } catch (err) {
           next(err)
    }

}

export const newAdmin = async (req, res, next) => {

    const userInfo = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password:req.body.password
    }
    try {
        const newAdmin = await AdminModel.create(userInfo)
        newAdmin.password=undefined

        res.status(201).json({
            success:true,
            message:"Yeni admin başarıyla oluşturuldu",
            newAdmin
        })
    } catch (err) {
        next(err)
    }

}


export const getLoginAdmin=async (req,res,next)=>{
    const adminId=req.admin._id
    const admin=await AdminModel.findById(adminId)
    admin.password=undefined
    res.status(200).json({
        success:true,
        message:"Giriş yapan yöenticinin bilgileri getirildi.",
        admin
    })
}