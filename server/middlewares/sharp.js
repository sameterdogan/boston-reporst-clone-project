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
                console.log(dimensions.width)
                  if(dimensions.width > 650) {
                      console.log("heite girdii")
                      norm = {width: 650, height: null, fit: "fill"}
                      thumbnail = {width: 100, height: 100, fit: "fill"}
                  }
                  else if(dimensions.width>=400){
                      console.log("else ife girdii")
                      norm={width:400,height:null,fit:"fill"}
                      thumbnail={width:200,height:200,fit:"fill"}
                  }else if(dimensions.width<400){
                      norm={width:null,height:null,fit:"fill"}
                      thumbnail={width:200,height:200,fit:"fill"}
                  }
                  console.log(norm)
                  console.log(thumbnail)
                console.log("1")
                const newFilename = `${Date.now() + file.originalname}`
                await sharp(file.buffer)
                    .resize({
                        fit: sharp.fit.contain,
                        width: dimensions.width<400?null:200
                    })
                    .toFormat("jpeg")
                    .rotate()
                    .jpeg({
                        quality: 100,
                        chromaSubsampling: '4:4:4'
                    })
                    .toFile(`${path.join(rootDir, '/assets/thumbnailImage/')}120x120${newFilename}`);
                 console.log(norm)
                await sharp(file.buffer)
                    .resize({
                        fit: sharp.fit.contain,
                        width: dimensions.width<400?null:600
                    })
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