import express from "express"
import {newReport,getAllReports,deleteReport,getPublicReports,getPrivateReports,getReportById} from "../controllers/report"
import multerImage from "../middlewares/multer";
import joiValidate from "../middlewares/joiValidate";
import {reportSchema} from "../util/validation/reportValidation"
import reportQuery from "../middlewares/reporttQuery";
import {isAdmin} from "../middlewares/auth";
import resizeImage from "../middlewares/sharp";
const router =express.Router()

router.post("/new-report",multerImage.array("images",4),joiValidate(reportSchema),resizeImage,newReport)
router.get("/all-reports",getAllReports)
router.get("/public-reports",reportQuery(true),getPublicReports)
router.get("/private-reports",isAdmin,reportQuery(false),getPrivateReports)
router.get("/reports-by-category",reportQuery(true,))
router.get("/:reportId",getReportById)
router.delete("/delete-report/:reportId",deleteReport)


export default router