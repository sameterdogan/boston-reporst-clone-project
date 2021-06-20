import express from "express"
import {newUser,newAdmin,getLoginAdmin} from "../controllers/user"
import {isAdmin} from "../middlewares/auth";


const router =express.Router()


router.post("/new-user",newUser)

router.post("/new-admin",newAdmin)

router.use(isAdmin)
router.get("/get-admin",getLoginAdmin)



export default router