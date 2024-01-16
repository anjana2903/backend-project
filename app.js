const express = require("express")
const expressSession = require("express-session")
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express()
app.use (cors()) 
app.use (cookieParser())
app.use (express.json())
app.use (expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false
}))

app.all ("/",(req, res) => {
    res.status(200).json({
        message:"express server is up an running",
        success:"true"
    })
})

module.exports = app