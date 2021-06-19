import mongoose from 'mongoose'
import bcrypt from "bcryptjs"

const Schema = mongoose.Schema

const AdminSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        role:{
            type:String,
            enum: ["admin", "superAdmin",],
            default:"admin"
        },
        lastName:{
            type: String,
            trim: true,

        },
        email: {
            type: String,
            trim: true,
        },
        password:{
            type:String
        }
    },
    {
        timestamps: true,
    },
)
AdminSchema.path('email').validate(async (email) => {
    const userCount = await mongoose.models.Admin.countDocuments({ email })
    return !userCount
}, 'Bu email adresine kayıtlı yönetici zaten mevcut.')

AdminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return (next)
    try{
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await  bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    }catch (err){

    }


})

export default mongoose.model('Admin', AdminSchema)