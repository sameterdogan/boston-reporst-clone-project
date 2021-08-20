import express from "express"
import {newTransfer,getTransferById} from "../controllers/transfer";

const router =express.Router()


router.post("/new-transfer",newTransfer)

router.get("/transfer-by-id/:transferId",getTransferById)

export default router