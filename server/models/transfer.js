import mongoose from 'mongoose'
import ReportModel from "./report"
import CustomError from "../util/CustomError";

const Schema = mongoose.Schema

const TransferSchema = new Schema(
    {
       report:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"Report"
       },
        employee:{
           type:mongoose.Schema.Types.ObjectId,
            ref:"Employee"
        }
    },
    {
        timestamps: true,
    },
)



export default mongoose.model('Transfer', TransferSchema)