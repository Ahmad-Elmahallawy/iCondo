const asyncHandler = require("express-async-handler");
const { uploadFile, getFile } = require("../middleware/minioMiddleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
}).single("file");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// @desc Post file
// @route Post /api/file/:username
// @access Private
const ProfilePictureUpload = asyncHandler(async (req, res) => {
  const { username } = req.params;

  await upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error uploading file" });
    }
    try {
      const results = await uploadFile(
        "profile-picture",
        req.file,
        username + ".png"
      );
      try {
        const objInfo = await getFile("profile-picture", username + ".png");
        return res.json({ status: "success", url: objInfo });
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (err) {
      console.log(err);
    }
  });
});
// @desc Get file
// @route Get /api/file/:username
// @access Private
const ProfilePictureGet = asyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const objInfo = await getFile("profile-picture", username + ".png");
    return res.json({ url: objInfo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  ProfilePictureUpload,
  ProfilePictureGet,
};
