const { protect } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const prisma = require('../index');
const {registerUser} = require('../controller/userController')
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

jest.mock('../index', () => ({
    user: {
        findUnique: jest.fn(),
    },
}));

const mockRequest = () => {
    const req = {};
    req.headers = {};
    return req;
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('protect middleware', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next() and set req.user if token is valid', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const token = 'validToken';
        req.headers.authorization = `Bearer ${token}`;

        const decodedToken = {
            id: 'userId',
        };

        const user = {
            id: 'userId',
            name: 'John Doe',
        };

        jwt.verify.mockReturnValue(decodedToken);
        prisma.user.findUnique.mockResolvedValue(user);

        const next = jest.fn();

        await protect(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: {
                id: decodedToken.id,
            },
            select: {
                id: true,
                name: true,
                password: false,
            },
        });
        expect(req.user).toEqual(user);
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 error if token is invalid', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const token = 'invalidToken';
        req.headers.authorization = `Bearer ${token}`;

        const error = new Error('Invalid token');
        jwt.verify.mockImplementation(() => {
            throw error;
        });

        const next = jest.fn();

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 error if no token is provided', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const next = jest.fn();

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, no token' });
        expect(next).not.toHaveBeenCalled();
    });
});