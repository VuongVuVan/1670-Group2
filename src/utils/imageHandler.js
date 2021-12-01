const multer = require("multer");

function upload(currentPath) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, currentPath);
        },
        filename: (req, file, cb) => {
            var index = file.originalname.lastIndexOf(".");
            var extension = file.originalname.substr(index + 1);
            var image_name = req.body.name + "_" + Date.now() + "." + extension;
            cb(null, image_name);
        }
    });
    return multer({ storage: storage });
}

module.exports = { upload };