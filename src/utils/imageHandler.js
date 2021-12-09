const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

exports.resize = (width, height) => {
    // console.log(req.file); added to req
    sharp.cache(false);
    return async(req, res, next) => {
        if (req.file) {
            const resized = await sharp(req.file.path)
                .resize({ width, height, fit: "fill" })
                .png()
                .toBuffer();
            fs.writeFileSync(req.file.path, resized);
        }
        next();
    }
}

exports.upload = destination => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => { <<
            << << < HEAD
            var index = file.originalname.lastIndexOf(".");
            var extension = file.originalname.substr(index + 1);
            var image_name = req.body.email.split("@")[0] + "_" + Date.now() + "." + extension; ===
            === =
            // var index = file.originalname.lastIndexOf(".");
            // var extension = file.originalname.substr(index+1);
            extension = "png";
            // var image_name = req.body.email.split("@")[0] + "_" +  Date.now() + "." + extension;
            var image_name = req.body.email.split("@")[0] + "." + extension; >>>
            >>> > 2696 d34ab7a28e1cfc87f84ec7d3492fe0a9aa0c
            cb(null, image_name);
            //console.log(file) //file object
            // console.log(req.file) not add yet
        }
    });
    const limits = {
        fieldSize: 1000000
    }
    return multer({ storage, limits }).single("image");
}