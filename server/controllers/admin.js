import UserModel from "../models/user"
import AdminModel from "../models/admin"
import generatorPassword from "generate-password"
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
    if(await AdminModel.countDocuments({email:req.body.email}) >0 ) return next(new CustomError("Bu E-posta adına yönetici zaten tanımlı",400))
    const password=generatorPassword.generate({
        length: 8,
        numbers: true
    });
    const adminInfo = {
        name: req.body.name,
        surname: req.body.lastName,
        phone:req.body.phone,
        email: req.body.email,
        role:"admin",
        password
    }
    try {
        const newAdmin = await AdminModel.create(adminInfo)
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
/*export const editAdmin = async (req, res, next) => {

;
    const adminInfo = {
        name: req.body.name,
        lastName: req.body.lastName,
        phone:req.body.phone,
        email: req.body.email,
        role:"admin",
    }
    try {
        const newAdmin = await AdminModel.create(adminInfo)
        newAdmin.password=undefined

        res.status(201).json({
            success:true,
            message:"Yeni admin başarıyla oluşturuldu",
            newAdmin
        })
    } catch (err) {
        next(err)
    }

}*/

export const getLoginAdmin=async (req,res,next)=>{
    const userId=req.user._id
    const user=await AdminModel.findById(userId)
    user.password=undefined
    res.status(200).json({
        success:true,
        message:"Giriş yapan yöenticinin bilgileri getirildi.",
        user
    })
}

export const getAllAdmins=async (req,res,next)=>{
    const allAdmins=await AdminModel.find({role:"admin"});
    console.log(allAdmins)
    res.status(200).json({
        success:true,
        message:"Tüm Yöneticiler başarıyla getirildi",
        allAdmins
    })


}

export const deleteAdmin=async (req,res,next)=>{
    const deleteAdmin=await AdminModel.findByIdAndDelete(req.params.adminId);

    res.status(200).json({
        success:true,
        message:"Admin başarıyla silindi.",
        deleteAdmin
    })
}