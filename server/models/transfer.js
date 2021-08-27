import mongoose from 'mongoose'

import sendMail from "../util/nodemailer";

const Schema = mongoose.Schema

const TransferSchema = new Schema(
    {
       report:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"Report"
       },
        employee:{
           type:mongoose.Schema.Types.ObjectId,
            ref:"Admin"
        }
    },
    {
        timestamps: true,
    },
)


TransferSchema.pre("save",async function (next){
    try{
        const populateThis=await this.populate([{path:"employee",select:"name surname email"},{path:"report",select:"location"}]).execPopulate()
        let emailHtmlTamplate = `
       <h3>${process.env.MAIL_FROM_NAME}</h3>
       <h4> Merhaba ${populateThis.employee.name } ${populateThis.employee.surname} , </h4>
       
       <p>Yeni Şikayet Ataması. </p>
   
       <p>
          <h5>
          ${populateThis.report.location.address} 
          <span class="lead">adresinden yeni şikayet oluşturuldu.</span>
          </h5> 
      </p>
       `
        await sendMail({
            from: process.env.SMTP_USER,
            to: populateThis.employee.email,
            subject: 'Şikayet Ataması',
            html: emailHtmlTamplate,
        })
        next()
    }catch (err){
        next(err)
    }
})


export default mongoose.model('Transfer', TransferSchema)