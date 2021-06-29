import mongoose, {mongo} from 'mongoose'
import bcrypt from "bcryptjs";
import CategorySchema from "./category";


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

    const categoryCount = await mongoose.models.SubCategory.countDocuments({ subCategory })

    return !categoryCount
}, 'Bu alt kategori zaten mevcut.')
SubCategorySchema.pre('save', async function(next) {
/*    if (!this.isModified("category")) return (next)*/
    try{
        const category=await CategorySchema.findById(this.category)
        const categoryIndex=category.subCategories.findIndex(c=>c===this._id)
        console.log(categoryIndex)
        if(categoryIndex<0)category.subCategories.push(this._id)
        console.log(category.subCategories)
       await category.save()
        next()
    }catch (err){
      next(err)
    }


})

SubCategorySchema.pre("deleteOne",async function (next){
    try{
        const deleteCategory = await this.model.findOne(this.getQuery());
        const category=await CategorySchema.findById(deleteCategory.category)
        const categoryIndex=category.subCategories.findIndex(c=> String(c)=== String(deleteCategory._id))
        if(categoryIndex>=0)category.subCategories.splice(categoryIndex,1)
        await category.save()
        next()
    }catch (err){
        next(err)
    }

})

export default mongoose.model('SubCategory', SubCategorySchema)