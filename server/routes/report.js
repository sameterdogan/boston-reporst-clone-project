import express from "express"
import {newReport} from "../controllers/report"
import multerImage from "../middlewares/multer";

const router =express.Router()

router.post("/new-report",multerImage.array("photos",4),newReport)


export default router