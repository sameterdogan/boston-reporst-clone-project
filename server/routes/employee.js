import express from "express"
import {newEmployee,getEmployeesByCategoryId,deleteEmployee} from "../controllers/employee"
import {isAdmin, isSuperAdmin} from "../middlewares/auth";
import joiValidate from "../middlewares/joiValidate";
import {userSchema} from "../util/validation/userValidation"


const router =express.Router()


router.get("/employees-by-category/:categoryId",getEmployeesByCategoryId)

router.post("/new-employee",joiValidate(userSchema),newEmployee)

router.delete("/delete-employee",deleteEmployee)







export default router