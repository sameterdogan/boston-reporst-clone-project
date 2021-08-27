import express from "express"
import {newTransfer,getTransferById} from "../controllers/transfer";
import {isAdmin, isLogin} from "../middlewares/auth";

const router =express.Router()

router.use(isLogin)
router.use(isAdmin)
router.post("/new-transfer",newTransfer)

router.get("/transfer-by-id/:transferId",getTransferById)

export default router