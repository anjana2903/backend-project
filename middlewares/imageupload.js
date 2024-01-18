const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        let prefix = `${Date.now()}-${Math.floor(Math.random() * 1E9)}-`
        let filename = file.originalname.split(" ").join("-")
        cb(null, prefix + filename)
    },
});


const upload = multer({storage})

module.exports = upload

