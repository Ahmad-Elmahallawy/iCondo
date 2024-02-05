const asyncHandler = require("express-async-handler");
const {uploadFile, getFile} = require('../middleware/minioMiddleware')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({
    storage,
}).single('file');
const Minio = require('minio')
const fs = require('fs')
const minioClient = new Minio.Client({
    endPoint: 'devstoragecondos.happyfir.com',
    port: 443,
    accessKey: "WKFacN9LKukfU4LrL4TS",
    secretKey: "rwiHDYHQwsyDbs9YOh0VGUSV4vwDN0quOfAauMuz",
    useSSL: true
})
// const ProfilePictureUpload = asyncHandler(async (req, res) => {
//
//     await upload(req, res, async (err) => {
//         if (err) {
//             console.log(err)
//             return res.status(400).json({ error: 'Error uploading file' });
//         }
//         try {
//             if (!req.file) {
//                 throw new Error('Invalid file path');
//             }
//             // const fileBuffer = await fs.createReadStream(req.file.buffer);
//             const objInfo = await minioClient.putObject('profile-picture', req.file.name, req.file.buffer);
//             console.log('File uploaded successfully:', objInfo);
//             return objInfo;
//         } catch (err) {
//             console.error('Error uploading file:', err);
//             throw err;
//         }
//         //     try {
//         //     const results = await fileUpload(req.file, "abc")
//         //     console.log(results);
//         //     return res.json({ status: "success" });
//         // } catch (err) {
//         //     console.log(err);
//         // }
//     })
//
// });
const ProfilePictureUpload = asyncHandler(async (req, res) => {

    await upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: 'Error uploading file' });
        }
        try {
            const results = await fileUpload(req.file, "abc.png")
            console.log(results);
            return res.json({ status: "success" });
        } catch (err) {
            console.log(err);
        }
    })

});

const ProfilePictureGet = asyncHandler(async (req, res) => {

   getFile("profile-picture", "abc.png");

});
module.exports = {
    ProfilePictureUpload,
    ProfilePictureGet
}