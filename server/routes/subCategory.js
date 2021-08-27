import express from "express"
import {
    getAllSubCategories,
    editSubCategory,
    newSubCategory,
    deleteSubCategory,
    getSubCategoriesByCategoryId
} from "../controllers/category";
import {isAdmin, isLogin, isSuperAdmin} from "../middlewares/auth";


const router =express.Router({
    mergeParams: true //
})
router.get("/sub-categories",getSubCategoriesByCategoryId)
router.use(isLogin)
router.use(isSuperAdmin)
router.get("/all-sub-categories",getAllSubCategories)
router.post("/new-sub-category",newSubCategory)
router.put("/edit-sub-category/:subCategoryId",editSubCategory)
router.delete("/delete-sub-category/:subCategoryId",deleteSubCategory)






export default router