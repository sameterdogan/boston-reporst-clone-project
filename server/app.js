import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import apiRouter from "./routes/index"
import helmet from 'helmet'
import dbConnection from "./util/dbConnection"
import CustomError from "./util/CustomError";
import cookieParser from "cookie-parser"

dotenv.config({path: './config/config.env'})
dbConnection()
const app = express()
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: [`${process.env.CLIENT_URL}`]
}))
app.use(express.json())
app.use(helmet())
app.use("/api", apiRouter)
app.use((err, req, res, next) => {
    let customError = err;
    if (err.name === "SyntaxError") {
        customError = new CustomError(err.message, 400);
    }

    if (err.name === "ValidationError") {
        customError = new CustomError(err.message, 400);
    }
    res.status(customError.status || 500).json({
        success: false,
        error: customError.message
    })
})

app.set('trust proxy', true)

export default app