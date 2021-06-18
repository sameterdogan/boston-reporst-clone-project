import express from "express"
import {newUser} from "../controllers/user"



const router =express.Router()


router.post("/new-user",newUser)



export default router