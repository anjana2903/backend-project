require("dotenv").config();
const app = require("./app");
const connectDB = require("./db/connectDB");

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Express server listening on port : ${process.env.PORT}`);
    });
});