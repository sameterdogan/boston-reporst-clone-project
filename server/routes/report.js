import express from "express"
import {
    counts,
    newReport,
    getAllWaitingReports,
    deleteReport,
    getPublicReports,
    getAllActiveReports,
    reportOpen,
    reportClose,
    getReportById,
    getReportsBySubCategoryId,
    getAllSolvedReports,
    getActiveReportsByEmployeeId,
    getSolvedReportsByEmployeeId
} from "../controllers/report"
import multerImage from "../middlewares/multer";
import joiValidate from "../middlewares/joiValidate";
import {reportSchema} from "../util/validation/reportValidation"
import reportQuery from "../middlewares/reporttQuery";
import reportsByCategoryQueryId from "../middlewares/reportBySubCategoryQuery"
import {isAdmin, isEmployee, isSuperAdmin} from "../middlewares/auth";
import resizeImage from "../middlewares/sharp";
const router =express.Router()
router.get("/active-reports-by-employee-id/:employeeId",isEmployee,getActiveReportsByEmployeeId)
router.get("/solved-reports-by-employee-id/:employeeId",isEmployee,getSolvedReportsByEmployeeId)
router.get("/counts",counts)
router.post("/new-report",multerImage.array("images",4),joiValidate(reportSchema),resizeImage,newReport)
router.get("/public-reports",reportQuery,getPublicReports)
router.get("/all-solved-reports",isAdmin,getAllSolvedReports)
router.get("/all-waiting-reports",isAdmin,getAllWaitingReports)
router.get("/all-active-reports",isAdmin,getAllActiveReports)


/*router.get("/private-reports",isAdmin,reportQuery(false),getPrivateReports)*/
router.get("/reports-by-sub-category/:subCategoryId",reportsByCategoryQueryId,getReportsBySubCategoryId)
router.get("/:reportId",getReportById)
router.get("/:reportId/open-report",isAdmin,reportOpen)
router.post("/:reportId/close-report",multerImage.array("images",2),resizeImage,reportClose)
router.delete("/delete-report/:reportId",deleteReport)




export default router