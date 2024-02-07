const {prisma} = require("../index");
const {registerUser} = require('../controller/userController')

describe('registerUser', () => {
    let testUser, testUserAlreadyExists;

    beforeAll(async () => {

        testUserAlreadyExists = await prisma.user.create({
            data: {
                first_name: 'UnitTest-firstname',
                last_name: 'UnitTest-lastname',
                email: 'UnitTest@email.test2',
                password: '12345678',
                role_id: 7,
                username: 'UnitTest-username2',
                phone_number: '1234567890123',
            },
        });
    });

    afterAll(async () => {
        if (testUser) {
            // Delete the test user from the database
            await prisma.User.delete({
                where: {
                    email: testUser.email
                }
            });
        }
        await prisma.User.delete({
            where: {
                email: testUserAlreadyExists.email
            }
        });
    });

    it('shouldn\'t register due to missing fields', async () => {
        // Define a test user payload
        testUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test1@example.com',
            password: 'testpassword',
            role: 'Admin',
        };
        const req = { body: testUser };

        // Simulate an HTTP response
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await registerUser(req, res)
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Please add all fields" });
    });

    it('shouldn\'t register due to wrong role', async () => {
        // Define a test user payload
        testUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test1@example.com',
            password: 'testpassword',
            role: 'testRolePlzDontExist',
            username: 'johndoe123',
            phone_number: '12333',
        };
        const req = { body: testUser };

        // Simulate an HTTP response
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await registerUser(req, res)
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Invalid role specified" });
    });

    it('shouldn\'t register due to user already exists (same email)', async () => {
        // Define a test user payload
        testUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: testUserAlreadyExists.email,
            password: 'testpassword',
            role: 'Admin',
            username: 'johndoe123',
            phone_number: '12333',
        };
        const req = { body: testUser };

        // Simulate an HTTP response
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await registerUser(req, res)
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "User already exists" });
    });

    it('shouldn\'t register due to database constraint (same username as other user)', async () => {
        // Define a test user payload
        testUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test1@example.com',
            password: 'testpassword',
            role: 'Admin',
            username: testUserAlreadyExists.username,
            phone_number: '12333',
        };
        const req = { body: testUser };

        // Simulate an HTTP response
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await registerUser(req, res)
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Invalid user data" });
    });

    it('should register a new user', async () => {
        // Define a test user payload
        testUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test1@example.com',
            password: 'testpassword',
            role: 'Admin',
            username: 'johndoe123',
            phone_number: '12333',
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

        expect(response.status).toBeCalledWith(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('first_name', testUser.first_name);
        expect(response.body).toHaveProperty('last_name', testUser.last_name);
        expect(response.body).toHaveProperty('username', testUser.username);
        expect(response.body).toHaveProperty('email', testUser.email);
        expect(response.body).toHaveProperty('phone_number', testUser.phone_number);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('role', testUser.role);
    });
});