const Minio = require('minio');
const asyncHandler = require('express-async-handler');

const minioClient = new Minio.Client({
    endPoint: 'devstoragecondos.happyfir.com',
    port: 443,
    accessKey: "9ZkKfhheVo0E6A9qWNfy",
    secretKey: "smYP4OnX7JmI1PdogGiIzzKFaH7vTu2nqQnarG58",
    useSSL: true
});

const uploadFile = async (file, fileName) => {
    try {
        const objInfo = await minioClient.putObject('profile-picture', fileName, file.buffer);
        console.log('File uploaded successfully:', objInfo);
        return objInfo;
    } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
    }
};

const getFile = async (bucket, fileName) => {
    var size = 0
    minioClient.getObject(bucket, fileName, function (err, dataStream) {
        if (err) {
            return console.log(err)
        }
        dataStream.on('data', function (chunk) {
            size += chunk.length
        })
        dataStream.on('end', function () {
            console.log('End. Total size = ' + size)
        })
        dataStream.on('error', function (err) {
            console.log(err)
        })
    })
};

module.exports = {uploadFile, getFile};