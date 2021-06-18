import mongoose, {mongo} from 'mongoose'


const Schema = mongoose.Schema

const SubCategorySchema = new Schema(
    {
        category:{
            type:mongoose.Schema.Types.ObjectId,
            req:"Category",
        },
        subCategory:{
            type:String
        },
        slugCategory: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)
SubCategorySchema.path('subCategory').validate(async (subCategory) => {
    console.log(subCategory)
    const categoryCount = await mongoose.models.SubCategory.countDocuments({ subCategory })
    console.log(categoryCount)
    return !categoryCount
}, 'Bu kategori zaten mevcut.')


export default mongoose.model('SubCategory', SubCategorySchema)