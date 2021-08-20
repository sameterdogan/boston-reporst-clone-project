import mongoose from 'mongoose'


const Schema = mongoose.Schema

const EmployeeSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        surname:{
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        phone:{
            type:String,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        slugName: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)



export default mongoose.model('Employee', EmployeeSchema)