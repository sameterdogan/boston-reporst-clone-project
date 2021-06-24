import express from "express"
import {newUser,newAdmin,getLoginAdmin,getAllUsers,deleteUser,editUser,getAllAdmins} from "../controllers/user"
import {isAdmin, isSuperAdmin} from "../middlewares/auth";
import joiValidate from "../middlewares/joiValidate";
import {userSchema} from "../util/validation/userValidation";
import {adminSchema} from "../util/validation/adminValidation";

const router =express.Router()


router.post("/new-user",joiValidate(userSchema),newUser)

router.use(isAdmin)

router.get("/all-users",getAllUsers)
router.delete("/delete-user/:userId",deleteUser)
router.put("/edit-user/:userId",editUser)
router.get("/get-admin",getLoginAdmin)

router.use(isSuperAdmin)

router.post("/new-admin",joiValidate(adminSchema),newAdmin)
router.get("/all-admins",getAllAdmins)




export default router