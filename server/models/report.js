import mongoose from 'mongoose'

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

export default mongoose.model("Report", ReportSchema)