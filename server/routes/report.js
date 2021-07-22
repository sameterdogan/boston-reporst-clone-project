import express from "express"
import {newReport,getAllWaitingReports,deleteReport,getPublicReports,getAllActiveReports,getPrivateReports,getReportById,getReportsBySubCategoryId,getAllSolvedReports} from "../controllers/report"
import multerImage from "../middlewares/multer";
import joiValidate from "../middlewares/joiValidate";
import {reportSchema} from "../util/validation/reportValidation"
import reportQuery from "../middlewares/reporttQuery";
import reportsByCategoryQueryId from "../middlewares/reportBySubCategoryQuery"
import {isAdmin} from "../middlewares/auth";
import resizeImage from "../middlewares/sharp";
const router =express.Router()

router.post("/new-report",multerImage.array("images",4),joiValidate(reportSchema),resizeImage,newReport)
router.get("/public-reports",reportQuery,getPublicReports)
router.get("/all-solved-reports",getAllSolvedReports)
router.get("/all-waiting-reports",getAllWaitingReports)
router.get("/all-active-reports",getAllActiveReports)

/*router.get("/private-reports",isAdmin,reportQuery(false),getPrivateReports)*/
router.get("/reports-by-sub-category/:subCategoryId",reportsByCategoryQueryId,getReportsBySubCategoryId)
router.get("/:reportId",getReportById)
router.delete("/delete-report/:reportId",deleteReport)


export default router