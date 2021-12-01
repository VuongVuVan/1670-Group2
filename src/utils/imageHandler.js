const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

exports.resize = (req, res, next) => {
    sharp(req.file.path)
    .resize(200, 200)
    .toFile("../", (err, info) => {
        console.log(err)
        console.log("===============")
        console.log(info)
        // fs.unlinkSync(req.file.path);
        if(!err) console.log("Resize succeed");
        else console.log(err);
    });
    next();
}

exports.upload = destination => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            var index = file.originalname.lastIndexOf(".");
            var extension = file.originalname.substr(index+1);
            var image_name = req.body.email.split("@")[0] + "_" +  Date.now() + "." + extension;
            cb(null, image_name);
        }
    });
    const limits = {
        fieldSize: 1000000
    }
    return multer({storage, limits}).single("image");
}