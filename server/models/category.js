import mongoose from 'mongoose'
import AdminModel from "./admin"

const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        category:{
          type:String
        },
        subCategories:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"SubCategory"
            }
        ],
        responsibleAdmin:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Admin"
        },
        slugCategory: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)






export default mongoose.model('Category', CategorySchema)