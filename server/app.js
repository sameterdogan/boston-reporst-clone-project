import express from 'express'
import dotenv from "dotenv"
import checkSuperAdmin from "./mig"
dotenv.config({path: './config/.env'})
import cors from 'cors'
import apiRouter from "./routes/index"
import helmet from 'helmet'
import dbConnection from "./util/dbConnection"
import CustomError from "./util/CustomError";
import cookieParser from "cookie-parser"

var useragent = require('express-useragent');



dbConnection()
checkSuperAdmin()
const app = express()
app.use(cookieParser())
app.use(cors({
    origin: '*',
}))

app.use(express.json())
app.use(express.urlencoded())
app.use(helmet())
app.use(useragent.express());
app.use('/assets', express.static('assets'))
app.use("/api", apiRouter)
app.use((err, req, res, next) => {
    let customError = err;
    console.log(err)
    if (err.name === "SyntaxError" || err.name === "ValidationError") {
        customError = new CustomError(err.message, 400);
    }
    res.status(customError.status || 500).json({
        success: false,
        message: customError.message
    })
})

app.set('trust proxy', true)

export default app