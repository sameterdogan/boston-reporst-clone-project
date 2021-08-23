import mongoose, {mongo} from 'mongoose'
import sendMail from '../util/nodemailer'
import fs from "fs"
import appRootPath from 'app-root-path'
import path from "path";

const rootDir = appRootPath.path
const Schema = mongoose.Schema

const ReportSchema = new Schema({
        user: {
            ip: {
                type: String
            },
            name: {
                type: String
            },
            surname: {
                type: String
            },
            email: {
                type: String
            },
            phone: {
                type: String
            }
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        status: {
            type: 'Number',
            enum: [0, 1, 2,],
            default: 0
            //0=bekliyor
            //1=açıldı
            //2=kapatıldı
        },
        location: {
            country:{type:String},
            district: {type: String},
            neighborhood: {type: String},
            street: {type: String},
            address:{type:String},
            lat:{type:String},
            lng:{type:String}
        },
        public: {
            type: Boolean,
            default: true
        },
        notes: [{
            createdAt: {
                type: Date,
                default: Date.now
            },
            description: {
                type: String
            }
        }],
        images: [{
            image: {type: String},
            thumbnail: {type: String}
        }],
        openingDate: {
            type: Date
        },
        closingDate: {
            type: Date
        },
        response:{
            description:{
                type:String,
            },
            images:[]
        },
        transfer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Transfer"
        },
        employee:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Admin"
        }

    },
    {
        timestamps: true,
    })

//is new document check
ReportSchema.pre('save', async function(next) {
    try {
        this.wasNew=this.isNew
        return next()
    } catch (err) {
        console.log(err)
        next(err)
    }

})
//added notes to mail
/*ReportSchema.pre('save', async function(next) {
    try {
        console.log(this.isModified("notes")+"notess")
    } catch (err) {
        console.log(err)
        next(err)
    }

})*/


//added report to notification and mail
ReportSchema.post('save', async function(_,next) {
    try {
       if(this.wasNew===false) return next()
        console.log(this)
        let emailHtmlTamplate = `
       <h3>${process.env.MAIL_FROM_NAME}</h3>
       <p> ${this.location.street} mahallesinde yeni şikayet oluşturuldu </p>
       `
        await sendMail({
            from: process.env.SMTP_USER,
            to: process.env.REPORT_EMAIL_ADDRESS,
            subject: 'BİLGİLENDİRME',
            html: emailHtmlTamplate,
        })

       global.io.emit("notifications",`<strong>${this.location.street} </strong>  Mahallesinden yeni bir şikayet var.Bekleyen şikayetler tablosunda seni bekliyor.`)
        console.log("geldiii")
    } catch (err) {
        console.log(err)
        next()
    }

})



//delete one images delete
ReportSchema.pre("deleteOne",async function  (next){
    try{
        const deletedReport = await this.model.findOne(this.getQuery());
        console.log(deletedReport);
        deletedReport.images.forEach(i=>{
            fs.unlink(path.join(rootDir, '/assets/image/' + i.image),(err=>{
                if(err)   console.log(err)
            }))

            fs.unlink(path.join(rootDir, '/assets/thumbnailImage/' + i.thumbnail),(err=>{
                if(err)   console.log(err)

            }))

        })

        next()
    }catch (err){
            next(err)
    }

})

//delete many images delete
ReportSchema.pre("deleteMany",async function  (next){
    try{
        const docs = await this.model.find(this.getFilter())
        const AllImages = docs.map((item) => item.images)
        AllImages.forEach(allI=>{
            allI.forEach(i=>{
                fs.unlink(path.join(rootDir, '/assets/image/' + i.image),(err=>{
                    if(err)   console.log(err)
                }))

                fs.unlink(path.join(rootDir, '/assets/thumbnailImage/' + i.thumbnail),(err=>{
                    if(err)   console.log(err)
                }))
            })


        })

        next()
    }catch (err){
        next(err)
    }

})
export default mongoose.model("Report", ReportSchema)