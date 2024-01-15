
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require("dotenv").config();

const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY
const S3_SECRET_KEY = process.env.S3_SECRET_KEY
const S3_BUCKET = process.env.S3_BUCKET
const S3_REGION = process.env.S3_REGION

AWS.config.update({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    region: S3_REGION
});

const S3 = new AWS.S3();

const UploadFunction = multer({
    storage: multerS3({
        s3: S3,
        bucket: S3_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, "EasyGoCars" + getCurrentDate() + "-" + file.originalname);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5 // only allowing only 5 MB files
    }
});

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-$day}`;
}
module.exports = UploadFunction;
