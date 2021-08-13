import UserModel from "../models/user"
import AdminModel from "../models/admin"
import CustomError from "../util/CustomError";
/*

export const newUser = async (req, res, next) => {
    const userInfo = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email:req.body.email
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

export const getAllUsers=async (req,res,next)=>{
    const allUsers=await UserModel.find()
    res.status(200).json({
        success:true,
        message:"Tüm kullanıcılar başarıyla döndürüldü.",
        allUsers
    })
}

export const deleteUser=async (req,res,next)=>{
    const deletedUser=await UserModel.findByIdAndDelete(req.params.userId)
    if(!deletedUser)return next(new CustomError("Kullanıcı bulunumadı.",404))
    res.status(200).json({
        success:true,
        message:"Kullanıcı başarıyla silindi.",
    })
}

export const editUser=async (req,res,next)=>{

    const userInfo = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email:req.body.email
    }
    try {
        let editUser = await UserModel.findById(req.params.userId)
        editUser.name=userInfo.name
        editUser.surname=userInfo.surname
        editUser.phone=userInfo.phone
        editUser.email=userInfo.email
        await editUser.save()
        res.status(200).json({
            success:true,
            message:"Kullanıcı bilgileri başarıyla güncellendi",
            editUser
        })
    } catch (err) {
        next(err)
    }
}
*/




export const newAdmin = async (req, res, next) => {
    const userInfo = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password:req.body.password,
        role:"admin"
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

export const getAllAdmins=async (req,res,next)=>{
    const allAdmins=await AdminModel.find({role:"admin"});
    res.status(200).json({
        success:true,
        message:"Tüm Yöneticiler başarıyla getirildi",
        allAdmins
    })
}