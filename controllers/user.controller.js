const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { uploadOnCloudinary } = require("../utils/cloudinaryService");

const registerUser = async (req, res, next) => {
    try {
        let localPath = req?.file?.path;
        if (!localPath) {
            return next(new ApiError("Avatar is a required field", 400));
        }
        const result = await uploadOnCloudinary(localPath);
        if (!result.secure_url || !result.public_id) {
            return next(new ApiError("Image Upload Failed", 400));
        }

        let { username, email, password } = req.body;

        console.log(result);

        return ApiResponse(res, 201, "User created successfully", {});
    } catch (error) {
        next(error);
    }
};

module.exports = registerUser;