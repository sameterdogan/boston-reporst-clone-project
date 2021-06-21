import express from "express"
import {adminLogin,adminLogut} from "../controllers/auth";


const router =express.Router()

router.post("/admin-login",adminLogin)

router.get("/admin-logout",adminLogut)









export default router