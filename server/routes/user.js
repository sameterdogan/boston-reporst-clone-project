import express from "express"
import {newUser,newAdmin} from "../controllers/user"



const router =express.Router()


router.post("/new-user",newUser)

router.post("/new-admin",newAdmin)



export default router