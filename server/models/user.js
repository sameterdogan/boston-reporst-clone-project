import mongoose from 'mongoose'


const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        ip:{
            type:String,
            required:true
        },
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
        slugName: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)
/*UserSchema.path('ip').validate(async (ip) => {
    const userCount = await mongoose.models.User.countDocuments({ ip })
    return !userCount
}, 'Bu ip adresine kayıtlı kullanıcı zaten mevcut.')*/


export default mongoose.model('User', UserSchema)