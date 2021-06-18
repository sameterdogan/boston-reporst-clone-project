import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ReportSchema = new Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: 'Number',
            enum: [0, 1,],
            default: 0
            //0=açık
            //1=kapatıldı
        },
        address: {
            neighborhood:{type:String},
            Street:{type:String}
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
        },
       subCategory:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"SubCategory",
       },
        images:[]
    },
    {
        timestamps: true,
    })

export default mongoose.model("Report", ReportSchema)