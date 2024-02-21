const { errorHandler } = require('../middleware/errorMiddleware');

describe('errorHandler middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            statusCode: 200, // Set a default status code for testing
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should respond with status code 500 and error message', () => {
        const errorMessage = 'Internal Server Error';
        const err = new Error(errorMessage);

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: errorMessage,
            stack: expect.any(String), // In non-production environment, stack trace should be sent
        });
    });

    it('should respond with custom status code and error message', () => {
        const customStatusCode = 404;
        const errorMessage = 'Resource not found';
        const err = new Error(errorMessage);

        errorHandler(err, req, { ...res, statusCode: customStatusCode }, next);

        expect(res.status).toHaveBeenCalledWith(customStatusCode);
        expect(res.json).toHaveBeenCalledWith({
            message: errorMessage,
            stack: expect.any(String), // In non-production environment, stack trace should be sent
        });
    });

    it('should respond with status code 500 and error stack in production environment', () => {
        const errorMessage = 'Internal Server Error';
        const err = new Error(errorMessage);
        process.env.NODE_ENV = 'production';

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: errorMessage,
            stack: null, // Stack trace should be null in production environment
        });

        process.env.NODE_ENV = 'test'; // Reset NODE_ENV after the test
    });

    // Add more test cases as needed
});
