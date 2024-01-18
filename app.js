const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ApiResponse = require("./utils/ApiResponse");
const errorMiddleware = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError");
const MongoStore = require("connect-mongo");
const authRoutes = require("./routes/auth.routes");


const store = new MongoStore({
    mongoUrl : process.env.MONGO_URI,
    collectionName : "my-sessions"
})

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store : store
    })
);

/* Custom Routes */

app.use("/api/v1/auth", authRoutes)


app.all("/", (req, res, next) => {
    return next(new ApiError("Something is very very wrong", 404));
    return ApiResponse(res, 200, "Express server is up and running!", {});
});

app.use(errorMiddleware);
module.exports = app;