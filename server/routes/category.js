import express from "express"
import {deleteCategory, editCategory, newCategory, newSubCategory} from "../controllers/category";
import subCategoryRouter from "./subCategory";
import {isAdmin} from "../middlewares/auth";


const router =express.Router()
router.use("/:categoryId/sub-category",subCategoryRouter)

router.use(isAdmin)

router.post("/new-category",newCategory)

router.put("/edit-category/:categoryId",editCategory)

router.delete("/delete-category/:categoryId",deleteCategory)





export default router