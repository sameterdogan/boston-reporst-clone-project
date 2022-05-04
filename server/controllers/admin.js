
import AdminModel from "../models/admin"
import generatorPassword from "generate-password"
import CustomError from "../util/CustomError";

export const newAdmin = async (req, res, next) => {


    try {

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
    try{
        const userId=req.user._id
        const user=await AdminModel.findById(userId)
        user.password=undefined
        res.status(200).json({
            success:true,
            message:"Giriş yapan yöenticinin bilgileri getirildi.",
            user
        })
    }catch (err){
        next(err)
    }

}
export const getAllAdmins=async (req,res,next)=>{

    try{
        const allAdmins=await AdminModel.find({role:"admin"}).populate("category");
        console.log(allAdmins)
        res.status(200).json({
            success:true,
            message:"Tüm Yöneticiler başarıyla getirildi",
            allAdmins
        })
    }catch (err){
        next(err)
    }

}
export const unassignedAdmins=async (req,res,next)=>{

    try{
        const unassignedAdmins=await AdminModel.find({role:"admin"}).populate("category")
        console.log(unassignedAdmins)
        res.status(200).json({
            success:true,
            message:"Atanmayan Yöneticiler başarıyla getirildi",
            unassignedAdmins
        })
    }catch (err){
        next(err)
    }

}

export const deleteAdmin=async (req,res,next)=>{
    try{
        const deleteAdmin=await AdminModel.findById(req.params.adminId).populate("category");
        if(deleteAdmin.category){
            return next(new CustomError(`Admini silmeden önce ${deleteAdmin.category.category} kategorisi üzerindeki yetkisini almanız gerekiyor.`,400))
        }
        await AdminModel.findByIdAndDelete(req.params.adminId);

        res.status(200).json({
            success:true,
            message:"Admin başarıyla silindi.",
            deleteAdmin
        })
    }catch (err){
        next(err)
    }


}