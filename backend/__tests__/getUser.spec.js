const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {getUser} = require('../controller/userController')
describe('getUser', () => {
    let testUser; // Declare testUser variable

    // Before running the tests, create a test user in the database
    beforeAll(async () => {
        testUser = await prisma.user.create({
            data: {
                first_name: 'ABC',
                last_name: 'ABC',
                email: 'test2@example.com',
                password: 'password',
                role_id: 7,
                username: 'johndoe1234',
                phone_number: '00000',
            },
        });
    });

    // After running the tests, delete the test user from the database
    afterAll(async () => {
        await prisma.user.delete({
            where: {
                email: testUser.email,
            },
        });
    });

    it('should return the user with the provided ID', async () => {
        const req = { params: { userid: testUser.id } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await getUser(req, res);
        expect(res.status).toBeCalledWith(201);
        expect(res.body).toHaveProperty('email', testUser.email);
        expect(res.body).toHaveProperty('first_name', testUser.first_name);
        expect(res.body).toHaveProperty('last_name', testUser.last_name);
        expect(res.body).toHaveProperty('username', testUser.username);
        expect(res.body).toHaveProperty('phone_number', testUser.phone_number);
    });
    it('should return a 404 error if the user with the provided ID does not exist', async () => {
        const req = { params: { userid: '1000' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });

        await getUser(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: 'User doesn\'t exist' });
    });
});