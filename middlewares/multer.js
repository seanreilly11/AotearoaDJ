const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const keys = require("../config/keys");

cloudinary.config({
    cloud_name: keys.CLOUD_NAME,
    api_key: keys.CLOUDINARY_API_KEY,
    api_secret: keys.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "aotearoadj",
        format: "mp4",
    },
});

const upload = multer({
    storage,
});

module.exports = upload;
