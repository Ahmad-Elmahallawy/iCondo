const asyncHandler = require('express-async-handler');
const prisma = require('../index')

const getFileByID = asyncHandler(async (req, res) => {
    const fileId = parseInt(req.params.id); // Assuming the id is an integer in Prisma

    const file = await prisma.file.findUnique({
        where: { id: fileId },
    });

    if (!file) {
        res.status(404);
        throw new Error('File not found');
    }

    res.status(200).json(file);
});

// @desc Delete file
// @route Delete /api/file/:id
// @access Private
const deleteFile = asyncHandler(async (req, res) => {
    const fileId = parseInt(req.params.id); // Assuming the id is an integer in Prisma

    const file = await prisma.file.findUnique({
        where: { id: fileId },
    });

    if (!file) {
        res.status(404);
        throw new Error('File not found');
    }

    await prisma.file.delete({
        where: { id: fileId },
    });

    res.status(200).json({ id: fileId });
});