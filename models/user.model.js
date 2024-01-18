const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is a required field."],
            lowercase: true,
            unique: true,
            trim: true,
        },
        username: {
            type: String,
            required: [true, "Username is a required field."],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is a required field."],
        },
        fullName: {
            type: String,
            default: "",
            trim: true,
        },
        avatar: {
            type: {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
            required : [true, "Avatar is a required field."],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        refresh_token: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){}

const User = mongoose.model("User", userSchema);
module.exports = User;