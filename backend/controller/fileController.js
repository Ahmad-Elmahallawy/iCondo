const asyncHandler = require("express-async-handler");
const {uploadFile, getFile} = require('../middleware/minioMiddleware')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({
    storage,
}).single('file');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// @desc Post file
// @route Post /api/file/:id
// @access Private
const ProfilePictureUpload = asyncHandler(async (req, res) => {
    const {userid} = req.params
    console.log(parseInt(userid))
    const currentUser = await prisma.User.findUnique({
        where: {id: parseInt(userid)},
    })

    await upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error uploading file' });
        }
        try {
            const results = await uploadFile('profile-picture', req.file, currentUser.username + ".png")
            try {
                const objInfo = await getFile("profile-picture",   currentUser.username + ".png");
                return res.json({ status: "success" , url: objInfo});
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (err) {
            console.log(err);
        }
    })
});
// @desc Get file
// @route Get /api/file/:id
// @access Private
const ProfilePictureGet = asyncHandler(async (req, res) => {
    const {userid} = req.params
    const currentUser = await prisma.User.findUnique({
        where: {id: parseInt(userid)}
    })
    try {
        const objInfo = await getFile("profile-picture",   currentUser.username + ".png");
        return res.json({ url: objInfo});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = {
    ProfilePictureUpload,
    ProfilePictureGet
}