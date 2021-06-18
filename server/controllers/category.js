import CategoryModel from "../models/category"
import SubCategoryModel from "../models/subCategory"
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