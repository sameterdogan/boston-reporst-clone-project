import mongoose from 'mongoose'


const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        category:{
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
CategorySchema.path('category').validate(async (category) => {
    const categoryCount = await mongoose.models.Category.countDocuments({ category })
    return !categoryCount
}, 'Bu kategori zaten mevcut.')


export default mongoose.model('Category', CategorySchema)