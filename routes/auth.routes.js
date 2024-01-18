const registerUser = require("../controllers/user.controller")
const upload = require("../middlewares/imageupload")

const router = require("express").Router()


router.get("/register", upload.single("avatar") , registerUser)

module.exports = router