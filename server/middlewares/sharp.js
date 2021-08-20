import sharp from "sharp"

import appRootPath from "app-root-path";

import path from "path";

const rootDir = appRootPath.path

var sizeOf = require('image-size');






const resizeImage = async (req, res, next) => {

    if (!req.files) return next();

    try {

        req.body.images = []
        let norm,thumbnail
        await Promise.all(
            req.files.map(async file => {
                var dimensions = sizeOf(file.buffer);
                  if(dimensions.width < 200) {
                      norm = {width: null, height: null, fit: "fill"}
                      thumbnail = {width: 100, height: 100, fit: "fill"}
                  }
                  else{
                      norm={width:600,height:600,fit:"fill"}
                      thumbnail={width:200,height:200,fit:"fill"}
                  }
                const newFilename = `${Date.now() + file.originalname}`
                await sharp(file.buffer)
                    .resize(thumbnail)
                    .toFormat("jpeg")
                    .rotate()
                    .jpeg({
                        quality: 100,
                        chromaSubsampling: '4:4:4'
                    })
                    .toFile(`${path.join(rootDir, '/assets/thumbnailImage/')}120x120${newFilename}`);

                await sharp(file.buffer)
                    .resize(norm)
                    .rotate()
                    .toFormat("jpeg")
                    .jpeg({
                        quality: 100,

                        chromaSubsampling: '4:4:4'
                    })
                    .toFile(`${path.join(rootDir, '/assets/image/')}800x800${newFilename}`);
                req.body.images.push({ thumbnail: "120x120" + newFilename, image: "800x800" + newFilename })

            })
        );



        next();

    } catch (err) {

        next(err)

    }



};



export default resizeImage