import express from "express"
import categoryRouter from "./category"
import userRouter from "./admin"
import reportRouter from "./report"
import authRouter from "./auth"
import employeeRouter from "./employee"
import transferRouter from "./transfer"
const router = express.Router()

router.use("/admins", userRouter)

router.use("/reports", reportRouter)

router.use("/categories", categoryRouter)

router.use("/employees", employeeRouter)

router.use("/auth", authRouter)

router.use("/transfers",transferRouter)


export default router