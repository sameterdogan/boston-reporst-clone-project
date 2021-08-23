import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
import sendMail from '../util/nodemailer'
const Schema = mongoose.Schema

const AdminSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        role:{
            type:String,
            enum: ["admin", "superAdmin","employee"],
            default:"admin"
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
        password:{
            type:String
        }
    },
    {
        timestamps: true,
        strict:false
    },
)
/*
AdminSchema.path('email').validate(async (email) => {
    const userCount = await mongoose.models.Admin.countDocuments({ email })
    return !userCount
}, 'Bu email adresine kayıtlı yönetici zaten mevcut.')
*/


AdminSchema.pre('save', async function(next) {
    if (!this.isModified('role')) return next()
    if(this.role==="superAdmin") return next()
    const email=this.email
    try{
        let emailHtmlTamplate = `
       <h3>${process.env.MAIL_FROM_NAME}</h3>
       <h4> Merhaba ${this.name } ${this.surname} , </h4>
       
       <p>098'e  davel edildin. </p>
   
       <h5>Email :<span class="lead"> ${this.email}</span></h5> 
       <h5>Password: <span class="lead">${this.password}</span></h5> 
       `
        await sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Davet',
            html: emailHtmlTamplate,
        })
        next()
    }catch (err){
        next(err)
    }
})
AdminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    try{
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await  bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    }catch (err){
     next(err)
    }
})


export default mongoose.model('Admin', AdminSchema)