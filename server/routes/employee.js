import express from "express"
import {newEmployee,getEmployeesByCategoryId,deleteEmployee,getLoginEmployee} from "../controllers/employee"
import {isAdmin, isSuperAdmin, isEmployee, isLogin} from "../middlewares/auth";
import joiValidate from "../middlewares/joiValidate";
import {userSchema} from "../util/validation/userValidation"


const router =express.Router()


router.get("/get-employee",isEmployee,getLoginEmployee)
router.use(isLogin)
router.use(isAdmin)
router.get("/employees-by-category/:categoryId",getEmployeesByCategoryId)

router.post("/new-employee",joiValidate(userSchema),newEmployee)

router.delete("/delete-employee",deleteEmployee)







export default router