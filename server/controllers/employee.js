
import AdminModel from "../models/admin";
import CategoryModel from "../models/category"
import CustomError from "../util/CustomError";
import SubCategoryModel from "../models/subCategory";
import generatorPassword from "generate-password";

export const newEmployee=async (req,res,next)=>{
    const password=generatorPassword.generate({
        length: 8,
        numbers: true
    });
    const employeeInfo = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email:req.body.email,
        category:req.body.categoryId,
        role:"employee",
        password,
    }
    try {
        if(await AdminModel.countDocuments({email:req.body.email}) >0 ) return next(new CustomError("Bu E-posta  zaten bir departmana tanımlı",400))
        const newEmployee = await AdminModel.create(employeeInfo)

        res.status(201).json({
            success:true,
            message:"Yeni çalışan başarıyla oluşturuldu",
            newEmployee
        })
    } catch (err) {
        next(err)
    }

}



export const getEmployeesByCategoryId=async (req,res,next)=>{

    try{

        const category=await CategoryModel.findById(req.params.categoryId)
        console.log(category)
        if(!category) return new CustomError("Bu departman bulunamadı.",404)

        const employeesByCategoryId= await AdminModel.find({category:String(category._id)})
        console.log(employeesByCategoryId)
        res.status(200).json({
            success:true,
            message:"Departman numarasına göre çalıanlar başarıyla getirildi.",
            employeesByCategoryId
        })
    }catch (err){
        next(err)
    }

}
export const deleteEmployee=async (req,res,next)=>{
    try{

        const deletedEmployee= await AdminModel.findByIdAndDelete(req.params.employeeId)
        res.status(200).json({
            success:true,
            message:"Çalışan silindi.",
            deletedEmployee
        })
    }catch (err){
        next(err)
    }
}

