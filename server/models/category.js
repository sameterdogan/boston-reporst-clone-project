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
/*CategorySchema.path('category').validate(async (category) => {

    console.log(this.isModified("category") +"category değişti mii")
    const categoryCount = await mongoose.models.Category.countDocuments({ category })
    console.log(categoryCount +"asdasd")
    console.log(!categoryCount+ "true mu false mu")
    return !categoryCount
}, 'Bu kategori zaten mevcut.')*/



export default mongoose.model('Category', CategorySchema)