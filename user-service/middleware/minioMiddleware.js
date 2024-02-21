const Minio = require('minio');
const asyncHandler = require('express-async-handler');

const minioClient = new Minio.Client({
    endPoint: 'devstoragecondos.happyfir.com',
    port: 443,
    accessKey: "9ZkKfhheVo0E6A9qWNfy",
    secretKey: "smYP4OnX7JmI1PdogGiIzzKFaH7vTu2nqQnarG58",
    useSSL: true
});

const uploadFile = async (bucket, file, fileName) => {
    try {
        const objInfo = await minioClient.putObject(bucket, fileName, file.buffer);
        console.log('File uploaded successfully:', objInfo);
        return objInfo;
    } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
    }
};

const getFile = async (bucket, fileName) => {
    return new Promise((resolve, reject) => {
        minioClient.presignedUrl('GET', bucket, fileName, 24 * 60 * 60, function (err, presignedUrl) {
            if (err) {
                reject(err);
            } else {
                resolve(presignedUrl);
            }
        });
    });
};


module.exports = {uploadFile, getFile, minioClient};