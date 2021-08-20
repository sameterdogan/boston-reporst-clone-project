import path from "path"
import multer from "multer"
import appRootPath from "app-root-path"
import CustomError from "../util/CustomError";
const rootDir = appRootPath.path


/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(rootDir, '/assets/image/'))
    },
    filename: function (req, file, cb) {
        req.image = `${Date.now()+file.originalname}`
        cb(null, req.image)
    }
});*/

const storage = multer.memoryStorage({

    destination: (req, file, cb) => {
        cb(null, path.join(rootDir, '/assets/image/'))
    },

    filename: (req, file, cb) => {
       console.log(req.image)
        req.image = `${Date.now()+file.originalname}`
        console.log(req.image+"imagee")
         console.log("geliiiasidasd")
        cb(null, req.image)
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