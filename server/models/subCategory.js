import mongoose, {mongo} from 'mongoose'
import bcrypt from "bcryptjs";
import CategoryModel from "./category";
import ReportModel from "./report";


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
        const category=await CategoryModel.findById(this.category)
        const categoryIndex=category.subCategories.findIndex(c=>c===this._id)

        if(categoryIndex<0)category.subCategories.push(this._id)

       await category.save()
        next()
    }catch (err){
      next(err)
    }


})

SubCategorySchema.pre("deleteOne",async function (next){
    try{
        const deleteCategory = await this.model.findOne(this.getQuery());
        const category=await CategoryModel.findById(deleteCategory.category)
        const categoryIndex=category.subCategories.findIndex(c=> String(c)=== String(deleteCategory._id))
        if(categoryIndex>=0)category.subCategories.splice(categoryIndex,1)
        await ReportModel.deleteMany({ subCategory: deleteCategory })
        await category.save()
        next()
    }catch (err){
        next(err)
    }

})
SubCategorySchema.pre('deleteMany', async function(next) {
    try {
        const docs = await this.model.find(this.getFilter())
        const SubCategoryId = docs.map((item) => item._id)
        await ReportModel.deleteMany({ subCategory: SubCategoryId })
        next()
    } catch (err) {
        console.log(err)
        return next(err)
    }

})

export default mongoose.model('SubCategory', SubCategorySchema)