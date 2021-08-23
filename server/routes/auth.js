import express from "express"
import {adminLogin, adminLogout} from "../controllers/auth";


const router =express.Router()

router.post("/admin-login",adminLogin)

router.get("/admin-logout",adminLogout)











export default router