import express from "express"
import {deleteCategory, newCategory, newSubCategory} from "../controllers/category";
import {isAdmin} from "../middlewares/auth";


const router =express.Router()

router.post("/new-category",isAdmin,newCategory)

router.post("/new-sub-category",isAdmin,newSubCategory)

router.delete("/delete-category/:categoryId",deleteCategory)




export default router