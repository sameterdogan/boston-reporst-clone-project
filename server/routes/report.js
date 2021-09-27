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
    getSolvedReportsByEmployeeId,
    getActiveReportsByCategoryId,
    getSolvedReportsByCategoryId,
    getWaitingReportsByCategoryId,
    navbarReportCounts,
    getReportsById,
    reportCategoryStatistics,
    reportSubCategoryStatistics,reportSolvedCategoryStatistics,
    reportDistrictStatistics,
    reportResponseTimeCategoryStatistics
} from "../controllers/report"
import multerImage from "../middlewares/multer";
import joiValidate from "../middlewares/joiValidate";
import {reportSchema} from "../util/validation/reportValidation"
import reportQuery from "../middlewares/reporttQuery";
import reportsByCategoryQueryId from "../middlewares/reportBySubCategoryQuery"
import {isAdmin, isEmployee, isLogin, isSuperAdmin} from "../middlewares/auth";
import resizeImage from "../middlewares/sharp";
const router =express.Router()
router.get("/report-category-statistics",reportCategoryStatistics)
router.get("/report-sub-category-statistics",reportSubCategoryStatistics)
router.get("/report-solved-category-statistics",reportSolvedCategoryStatistics)
router.get("/report-response-time-category-statistics",reportResponseTimeCategoryStatistics)
router.get("/report-district-statistics",reportDistrictStatistics)
router.get("/active-reports-by-employee-id/:employeeId",isLogin,isEmployee,getActiveReportsByEmployeeId)
router.get("/solved-reports-by-employee-id/:employeeId",isLogin,isEmployee,getSolvedReportsByEmployeeId)
router.get("/active-reports-by-category-id/:categoryId",isLogin,isAdmin,getActiveReportsByCategoryId)
router.get("/solved-reports-by-category-id/:categoryId",isLogin,isAdmin,getSolvedReportsByCategoryId)
router.get("/waiting-reports-by-category-id/:categoryId",isLogin,isAdmin,getWaitingReportsByCategoryId)
router.get("/counts",counts)
router.get("/navbar-report-counts",navbarReportCounts)

router.post("/new-report",multerImage.array("images",4),joiValidate(reportSchema),resizeImage,newReport)
router.get("/public-reports",reportQuery,getPublicReports)
router.get("/all-solved-reports",isLogin,isSuperAdmin,getAllSolvedReports)
router.get("/all-waiting-reports",isLogin,isSuperAdmin,getAllWaitingReports)
router.get("/all-active-reports",isLogin,isSuperAdmin,getAllActiveReports)

router.get("/reports-by-id",getReportsById)


/*router.get("/private-reports",isAdmin,reportQuery(false),getPrivateReports)*/
router.get("/reports-by-sub-category/:subCategoryId",reportsByCategoryQueryId,getReportsBySubCategoryId)
router.get("/:reportId",getReportById)
router.get("/:reportId/open-report",isLogin,isAdmin,reportOpen)
router.post("/:reportId/close-report",isLogin,multerImage.array("images",2),resizeImage,reportClose)
router.delete("/delete-report/:reportId",isLogin,isAdmin,deleteReport)




export default router