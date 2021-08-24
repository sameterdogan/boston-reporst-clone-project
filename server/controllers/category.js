import CategoryModel from "../models/category"
import SubCategoryModel from "../models/subCategory"
import AdminModel from "../models/admin"
import CustomError from "../util/CustomError";
//category
export const getAllCategories=async (req,res,next)=>{
    try{
        const allCategories=await CategoryModel.find().populate([{path:"subCategories"},{path:"responsibleAdmin"} ]).lean()
        res.status(200).json({
            success:true,
            message:"Tüm kategoriler listelendi.",
            allCategories
        })
    }catch (err){
        next(err)
    }
}
export const getSubCategoryById=async (req,res,next)=>{
    try{

        const subCategory=await SubCategoryModel.findById(req.params.subCategoryId)
        if(!subCategory) return new CustomError("Alt kategori bulunamadı.",404)
        res.status(200).json({
            success:true,
            message:"Alt kategori başarıyla getirildi.",
            subCategory
        })
    }catch (err){
        next(err)
    }
}
export const newCategory=async (req,res,next)=>{
    try{
        if( await CategoryModel.countDocuments({category:req.body.category})>0){
            return res.status(400).json({
                success:false,
                message:"Bu kategori zaten mevcut"
            })
        }
        const admin=await AdminModel.findOne( {_id:req.body.responsibleAdmin,role:"admin",category:null})
        if(!admin) return next(new CustomError("Bu Admin başka bir kategoriye  atanmış.",400))
        const newCategory=await CategoryModel.create({category:req.body.category,responsibleAdmin:req.body.responsibleAdmin})
        await AdminModel.findOneAndUpdate( {_id:req.body.responsibleAdmin,role:"admin"},{category:newCategory._id})
        res.status(201).json({
            success:true,
            message:"Yeni kategori başarıyla eklendi",
            newCategory
        })
    }catch (err){
        next(err)
    }

}
export const deleteCategory=async (req,res,next)=>{
    try{
        const deleteCategory=await CategoryModel.findByIdAndDelete(req.params.categoryId)
        if(!deleteCategory) return next(new CustomError("Kategori bilgisi bulunamadı",404))
        await AdminModel.findByIdAndUpdate(deleteCategory.responsibleAdmin,{category:null})
        await SubCategoryModel.deleteMany({category:req.params.categoryId})

        res.status(200).json({
            success:true,
            message:"kategori başarıyla silindi"
        })
    }catch (err){
         next(err)
    }

}
export const editCategory=async (req,res,next)=>{
    try{
        const editCategory=await CategoryModel.findById(req.params.categoryId)
        if(editCategory.category!==req.body.category  &&  await CategoryModel.countDocuments({category:req.body.category})>0){
            return res.status(400).json({
                success:false,
                message:"Bu kategori zaten mevcut"
            })
        }

        editCategory.category=req.body.category
        console.log(req.body.responsibleAdmin+"gelasd")
        await AdminModel.findByIdAndUpdate(req.body.responsibleAdmin,{category:req.body.responsibleAdmin})
        await AdminModel.findByIdAndUpdate(editCategory.responsibleAdmin,{category:null})
        editCategory.responsibleAdmin=req.body.responsibleAdmin

        await editCategory.save()

        res.status(201).json({
            success:true,
            message:"Kategori başarıyla güncellendi.",
            editCategory
        })
    }catch (err){
        next(err)
    }
}
export const assignAdmin=async (req,res,next)=>{
          try {
              const admin=await AdminModel.findOne( {_id:req.body.adminId,role:"admin",category:null})
              if(!admin) return next(new CustomError("Bu Admin başka bir kategoriye  atanmış.",400))

              const category=await CategoryModel.findById(req.body.categoryId)
              if(!category) return next(new CustomError("kategori bulunamadı atama başarısız",404))
              if(category.responsibleAdmin) return next(new CustomError("Bu kategoriye  zaten bi sorumlu atanmış",400))
              await AdminModel.findOneAndUpdate( {_id:req.body.adminId,role:"admin"},{category:category._id})
              category.responsibleAdmin=req.body.adminId

              await category.save()
              res.status(200).json({
                  success:true,
                  message:"Atama başarıyla yapıldı."
              })
          }   catch (err){
               next(err)
          }
}

//sub category
export const getAllSubCategories=async (req,res,next)=>{
    try{
        const allSubCategories=await SubCategoryModel.find().lean()
        res.status(200).json({
            success:true,
            message:"Tüm alt kategoriler listelendi.",
            allSubCategories
        })
    }catch (err){
        next(err)
    }
}
export const getSubCategoriesByCategoryId=async (req,res,next)=>{
    const subCategories=await SubCategoryModel.find({category:req.params.categoryId})
    res.status(200).json({
        success:true,
        message:"Alt kategoriler başarıyla listelendi.",
        subCategories
    })
}
export const newSubCategory=async (req,res,next)=>{

    try{
        if(await SubCategoryModel.countDocuments({subCategory:req.body.subCategory})>0){
            return res.status(400).json({
                success:false,
                message:"Bu alt kategori zaten mevcut"
            })
        }
        const newSubCategory=await SubCategoryModel.create({category:req.params.categoryId,subCategory:req.body.subCategory})
        res.status(201).json({
            success:true,
            message:"Alt kategori başarıyla eklendi",
            newSubCategory
        })
    }catch (err){
        next(err)
    }

}
export const deleteSubCategory=async (req,res,next)=>{
    try{
        const deleteCategory=await SubCategoryModel.deleteOne({_id:req.params.subCategoryId})

        res.status(200).json({
            success:true,
            message:"Alt kategori başarıyla silindi"
        })
    }catch (err){
        next(err)
    }

}
export const editSubCategory=async (req,res,next)=>{
    try{
        if( await SubCategoryModel.countDocuments({subCategory:req.body.subCategory})>0){
            return res.status(400).json({
                success:false,
                message:"Bu alt kategori zaten mevcut"
            })
        }
        const editSubCategory=await SubCategoryModel.findById(req.params.subCategoryId)
        editSubCategory.subCategory=req.body.subCategory
        await editSubCategory.save()
        res.status(200).json({
            success:true,
            message:"Alt kategori başarıyla güncellendi",
            editSubCategory
        })
    }catch (err){
        next(err)
    }

}