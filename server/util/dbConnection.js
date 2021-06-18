import mongoose from "mongoose";

export default () => {
    mongoose
        .connect(process.env.MONGODB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Veri tabanı bağlantısı başarılı.')
        })
        .catch(err => {
            console.log(err)
            console.log('Veri tabanı bağlantısı başarısız.')
        })
}