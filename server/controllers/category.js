import CategoryModel from "../models/category"
import SubCategoryModel from "../models/subCategory"
import CustomError from "../util/CustomError";
export const newCategory=async (req,res,next)=>{
    try{
        const newCategory=await CategoryModel.create({category:req.body.category})
        res.status(201).json({
            success:true,
            message:"Yeni kategori başarıyla eklendi",
            newCategory
        })
    }catch (err){
        next(err)
    }

}

export const newSubCategory=async (req,res,next)=>{

    try{
        const newSubCategory=await SubCategoryModel.create({category:req.body.category,subCategory:req.body.subCategory})
        res.status(201).json({
            success:true,
            message:"Alt kategori başarıyla eklendi",
            newSubCategory
        })
    }catch (err){
        next(err)
    }

}



export const deleteCategory=async (req,res,next)=>{
    try{
        const deleteCategory=await CategoryModel.findByIdAndDelete(req.params.categoryId)
        console.log(deleteCategory)
        if(!deleteCategory) return next(new CustomError("Kategori bilgisi bulunamadı",404))
        const deleteSubCategories=await SubCategoryModel.deleteMany({category:req.params.categoryId})

        res.status(200).json({
            success:true,
            message:"kategori başarıyla silindi"
        })
    }catch (err){
         next(err)
    }

}