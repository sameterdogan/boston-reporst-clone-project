import express from "express"
import categoryRouter from "./category"
import userRouter from "./admin"
import reportRouter from "./report"
import authRouter from "./auth"


const router =express.Router()

router.use("/admins",userRouter)

router.use("/reports",reportRouter)

router.use("/categories",categoryRouter)

router.use("/auth",authRouter)




export default router