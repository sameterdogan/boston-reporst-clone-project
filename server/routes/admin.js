import express from "express"
import {newAdmin, getLoginAdmin, getAllAdmins, deleteAdmin, unassignedAdmins} from "../controllers/admin"
import {isAdmin, isSuperAdmin,isLogin} from "../middlewares/auth";
import joiValidate from "../middlewares/joiValidate";
import {userSchema} from "../util/validation/userValidation";
import {adminSchema} from "../util/validation/adminValidation";

const router =express.Router()


/*router.post("/new-user",joiValidate(userSchema),newUser)

router.use(isAdmin)

router.get("/all-users",getAllUsers)
router.delete("/delete-user/:userId",deleteUser)
router.put("/edit-user/:userId",joiValidate(userSchema),editUser)*/

router.use(isLogin)
router.get("/get-admin",isLogin,getLoginAdmin)
router.use(isAdmin)
router.use(isSuperAdmin)

router.get("/unassigned-admins",unassignedAdmins)
router.post("/new-admin",joiValidate(adminSchema),newAdmin)
/*router.put("/edit-admin",joiValidate(adminSchema),editAdmin)*/
router.get("/all-admins",getAllAdmins)
router.delete("/delete-admin/:adminId",deleteAdmin)




export default router