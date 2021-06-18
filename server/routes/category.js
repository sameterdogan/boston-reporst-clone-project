import express from "express"
import {newCategory,newSubCategory} from "../controllers/category";


const router =express.Router()

router.post("/new-category",newCategory)

router.post("/new-sub-category",newSubCategory)




export default router