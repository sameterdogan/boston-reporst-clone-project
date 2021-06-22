import express from "express"
import {newUser,newAdmin,getLoginAdmin,getAllUsers,deleteUser,editUser} from "../controllers/user"
import {isAdmin} from "../middlewares/auth";


const router =express.Router()


router.post("/new-user",newUser)

router.post("/new-admin",newAdmin)

router.use(isAdmin)

router.get("/all-users",getAllUsers)
router.get("/get-admin",getLoginAdmin)
router.delete("/delete-user/:userId",deleteUser)
router.put("/edit-user/:userId",editUser)



export default router