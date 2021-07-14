import express from "express"
import {
    getAllSubCategories,
    editSubCategory,
    newSubCategory,
    deleteSubCategory,
    getSubCategoriesByCategoryId
} from "../controllers/category";
import {isAdmin} from "../middlewares/auth";


const router =express.Router({
    mergeParams: true // önceki routurden paramsların gelemesini sağlıyor
})
router.get("/sub-categories",getSubCategoriesByCategoryId)
router.use(isAdmin)
router.get("/all-sub-categories",getAllSubCategories)
router.post("/new-sub-category",newSubCategory)
router.put("/edit-sub-category/:subCategoryId",editSubCategory)
router.delete("/delete-sub-category/:subCategoryId",deleteSubCategory)






export default router