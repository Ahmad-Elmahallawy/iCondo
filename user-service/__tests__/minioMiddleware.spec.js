const { uploadFile, getFile, minioClient } = require('../middleware/minioMiddleware');
const minio = require('minio');

jest.mock('minio', () => ({
    Client: jest.fn(() => ({
        putObject: jest.fn(),
        presignedUrl: jest.fn(),
    })),
}));

describe('Minio Service Tests', () => {
    describe('uploadFile function', () => {
        it('should upload a file correctly', async () => {
            const bucketName = 'test-bucket';
            const fileName = 'test-file';
            const fileContent = Buffer.from('test content');

            minioClient.putObject.mockResolvedValueOnce({ BucketName: bucketName, Key: fileName, Data: fileContent });

            await expect(uploadFile(bucketName, { buffer: fileContent }, fileName)).resolves.toEqual({ BucketName: bucketName, Key: fileName, Data: fileContent });

            expect(minioClient.putObject).toHaveBeenCalledWith(bucketName, fileName, fileContent);
        });

        it('should throw an error if upload fails', async () => {
            const bucketName = 'test-bucket';
            const fileName = 'test-file';
            const fileContent = Buffer.from('test content');
            const errorMessage = 'Upload failed';

            minioClient.putObject.mockRejectedValueOnce(new Error(errorMessage));

            await expect(uploadFile(bucketName, { buffer: fileContent }, fileName)).rejects.toThrow(errorMessage);

            expect(minioClient.putObject).toHaveBeenCalledWith(bucketName, fileName, fileContent);
        });
    });

    describe('getFile function', () => {
        it('should generate a presigned URL correctly', async () => {
            const bucketName = 'test-bucket';
            const fileName = 'test-file';
            const presignedUrl = 'https://example.com';

            minioClient.presignedUrl.mockImplementationOnce((method, bucket, file, expiry, callback) => {
                callback(null, presignedUrl);
            });

            await expect(getFile(bucketName, fileName)).resolves.toEqual(presignedUrl);

            expect(minioClient.presignedUrl).toHaveBeenCalledWith('GET', bucketName, fileName, 24 * 60 * 60, expect.any(Function));
        });

        it('should throw an error if generating presigned URL fails', async () => {
            const bucketName = 'test-bucket';
            const fileName = 'test-file';
            const errorMessage = 'Presigned URL generation failed';

            minioClient.presignedUrl.mockImplementationOnce((method, bucket, file, expiry, callback) => {
                callback(new Error(errorMessage));
            });

            await expect(getFile(bucketName, fileName)).rejects.toThrow(errorMessage);

            expect(minioClient.presignedUrl).toHaveBeenCalledWith('GET', bucketName, fileName, 24 * 60 * 60, expect.any(Function));
        });
    });
});
