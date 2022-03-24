if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloud_name = process.env.cloud_name;
const api_key = process.env.api_key;
const api_secret = process.env.api_secret;


cloudinary.config({
    cloud_name: cloud_name,          //moze byc procces.env.nazwaZmiennejZENV
    api_key: api_key,
    api_secret: api_secret
});


/*const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'YelpCamp',
        format: async (req, file) => ['jpeg', 'png', 'jpg'] // supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
    },
});*/
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});
module.exports = {
    cloudinary,
    storage
}