const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloudinary = async function (filePath) {
    try {
        if (!filePath) return null;

        let result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            folder: "avatars",
        });
        fs.unlinkSync(filePath);
        return result;
    } catch (error) {
        fs.unlinkSync(filePath);
        return error;
    }
};

const deleteFromCloudinary = async function (public_id, resource_type = "image") {
    try {
        if (!public_id) return null;

        let result = await cloudinary.uploader.destroy(public_id, {
            resource_type,
        });

        return result;
    } catch (error) {
        console.log("Error in deleting file from cloudinary ", error);
        return error;
    }
};

module.exports = {
    uploadOnCloudinary,
    deleteFromCloudinary
};