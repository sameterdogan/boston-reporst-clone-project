import express from "express"
import {deleteCategory, editCategory, newCategory,getAllCategories} from "../controllers/category";
import subCategoryRouter from "./subCategory";
import {isAdmin} from "../middlewares/auth";
import joiValidate from "../middlewares/joiValidate";
import {categorySchema} from "../util/validation/categoryValidation"


const router =express.Router()

router.use("/:categoryId/sub-category",subCategoryRouter)

router.get("/all-categories",getAllCategories)
router.use(isAdmin)

router.post("/new-category",joiValidate(categorySchema),newCategory)

router.put("/edit-category/:categoryId",joiValidate(categorySchema),editCategory)

router.delete("/delete-category/:categoryId",deleteCategory)





export default router