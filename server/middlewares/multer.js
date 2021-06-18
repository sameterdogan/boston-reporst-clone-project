import path from "path"
import multer from "multer"
import appRootPath from "app-root-path"
const rootDir = appRootPath.path


const storage = multer.diskStorage({

    //gelen resmi hangi dosya yoluna kayıt edeceğimizi söylüyoruz
    destination: (req, file, cb) => {
        cb(null, path.join(rootDir, '/assets/image/'))
    },

    filename: (req, file, cb) => {


        req.images = `${Date.now()+file.originalname}`
         console.log(req.images)

        cb(null, req.images)
    },
})

const fileFilter = (req, file, cb) => {

    let allMimtypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
    //burada gelen resimlerini uzantılarını filitreledik
    if (!allMimtypes.includes(file.mimetype))
        return cb(new CustomError('Resim uzantısı jpg,png,gif veya jpeg olmalıdır.', 400), false)

    cb(null, true)


}

const multerImage = multer({ storage,fileFilter })

export default multerImage