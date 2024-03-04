const request = require('supertest');
const express = require('express');
const app = express();
const {
    ProfilePictureUpload,
    ProfilePictureGet
} = require('../controller/fileController');

// Mocking middleware functions
jest.mock('../middleware/minioMiddleware', () => ({
    uploadFile: jest.fn(),
    getFile: jest.fn()
}));

// Mocking PrismaClient
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => ({
        user: {
            findUnique: jest.fn(() => Promise.resolve({ username: 'testuser' }))
        }
    }))
}));

// Mocking multer
const multer = require('multer');
const memoryStorageMock = jest.fn(() => ({}));
multer.memoryStorage = memoryStorageMock;
multer.single = jest.fn();

// Mocking expressAsyncHandler
jest.mock('express-async-handler', () => jest.fn(fn => fn));

// Mocking getFile and uploadFile functions
const { getFile, uploadFile } = require('../middleware/minioMiddleware');
getFile.mockResolvedValue('mockedFileUrl');
uploadFile.mockResolvedValue('mockedUploadResult');

// Mocking req and res objects
const req = {
    params: { username: 'testuser' },
    file: { originalname: 'test.png', buffer: Buffer.from('') },
    headers: {
        'content-type': 'multipart/form-data',
        'content-length': 1234
    }
};
const res = {
    json: jest.fn(),
    status: jest.fn(() => res)
};

// Test for ProfilePictureUpload route
describe('POST /api/file/:username', () => {
    it('should handle upload errors', async () => {
        const error = new Error('Upload error');
        uploadFile.mockRejectedValueOnce(error);
        await ProfilePictureUpload(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error uploading file' });
    });
});

// Test for ProfilePictureGet route
describe('GET /api/file/:username', () => {
    it('should get the file successfully', async () => {
        await ProfilePictureGet(req, res);
        expect(getFile).toHaveBeenCalledWith('profile-picture', 'testuser.png');
        expect(res.json).toHaveBeenCalledWith({ url: 'mockedFileUrl' });
    });

    it('should handle getFile errors', async () => {
        const error = new Error('GetFile error');
        getFile.mockRejectedValueOnce(error);
        await ProfilePictureGet(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
});
