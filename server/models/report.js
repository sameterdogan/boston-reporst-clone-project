import mongoose from 'mongoose'
import sendMail from '../util/nodemailer'
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
            district: {type: String},
            neighborhood: {type: String},
            street: {type: String}
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
        }

    },
    {
        timestamps: true,
    })
ReportSchema.pre('save', async function(next) {
    try {
        this.wasNew=this.isNew
        return next()
    } catch (err) {
        console.log(err)
        next(err)
    }

})
/*ReportSchema.pre('save', async function(next) {
    try {
        console.log(this.isModified("notes")+"notess")
    } catch (err) {
        console.log(err)
        next(err)
    }

})*/
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
    } catch (err) {
        console.log(err)
        next()
    }

})
export default mongoose.model("Report", ReportSchema)