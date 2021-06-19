import express from "express"
import categoryRouter from "./category"
import userRouter from "./user"
import reportRouter from "./report"
import authRouter from "./auth"


const router =express.Router()

router.use("/users",userRouter)

router.use("/reports",reportRouter)

router.use("/categories",categoryRouter)

router.use("/auth",authRouter)




export default router