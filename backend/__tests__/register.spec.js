const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {registerUser} = require('../controller/userController')
describe('registerUser', () => {
    let testUser
    afterAll(async () => {
        if (testUser) {
            // Delete the test user from the database
            await prisma.User.delete({
                where: {
                    email: testUser.email
                }
            });
        }
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