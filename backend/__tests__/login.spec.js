const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { login, registerUser } = require('../controller/userController');

describe('login', () => {
    let testUser; // Declare testUser variable

    // Before running the tests, create a test user in the database
    beforeAll(async () => {
        testUser = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'test3@example.com',
                password: 'password',
                role: 'Admin',
                username: 'johndoe123455435',
                phone_number: '123431543154',
            };
        const req = { body: testUser };

        // Simulate an HTTP response
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Send a request to register the user
        response.json.mockImplementation((body) => {
            response.body = body;
            return response;
        });
        await registerUser(req, response)
        testUser = response.body
    });

    // After running the tests, delete the test user from the database
    afterAll(async () => {
        await prisma.user.delete({
            where: {
                id: testUser._id,
            },
        });
    });

    it('should login successfully with correct credentials', async () => {
        const req = {
            query: {
                email: testUser.email,
                password: 'password',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await login(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.body).toHaveProperty('first_name', testUser.first_name);
        expect(res.body).toHaveProperty('last_name', testUser.last_name);
        expect(res.body).toHaveProperty('username', testUser.username);
        expect(res.body).toHaveProperty('email', testUser.email);
        expect(res.body).toHaveProperty('phone_number', testUser.phone_number);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('role', testUser.role);
    });
});
