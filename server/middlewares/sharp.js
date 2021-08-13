import sharp from "sharp"
import appRootPath from "app-root-path";
import path from "path";
const rootDir = appRootPath.path



const resizeImage = async (req, res, next) => {
    if (!req.files) return next();
try{
    req.body.images=[]
    await Promise.all(
        req.files.map(async file => {

            const newFilename = `${Date.now()+file.originalname}`
            await sharp(file.buffer)
                .resize(120, 120)
                .toFormat("jpeg")
                .rotate()
                .jpeg({ quality: 90 })
                .toFile(`${path.join(rootDir, '/assets/thumbnailImage/')}120x120${newFilename}`);

            await sharp(file.buffer)
                .resize(800, 800)
                .rotate()
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`${path.join(rootDir, '/assets/image/')}800x800${newFilename}`);



            req.body.images.push({thumbnail:"120x120"+newFilename,image:"800x800"+newFilename})
        })
    );

    next();
}catch (err){
    next(err)
}

};

export default resizeImage