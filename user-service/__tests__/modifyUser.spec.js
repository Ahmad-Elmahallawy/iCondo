const {prisma} = require("../index");
const {modifyUser} = require('../controller/userController')
describe('modifyUser', () => {
    let testUserToModify, testUserAlreadyExists, newData; // Declare testUser variable

    // Before running the tests, create a test user in the database
    beforeAll(async () => {

        testUserToModify = await prisma.user.create({
            data: {
                first_name: 'UnitTest-firstname',
                last_name: 'UnitTest-lastname',
                email: 'UnitTest@email.test',
                password: '12345678',
                role_id: 7,
                username: 'UnitTest-username',
                phone_number: '1234567890',
            },
        });
        testUserAlreadyExists = await prisma.user.create({
            data: {
                first_name: 'UnitTest-firstname',
                last_name: 'UnitTest-lastname',
                email: 'UnitTest@email.test1',
                password: '12345678',
                role_id: 7,
                username: 'UnitTest-username1',
                phone_number: '12345678901',
            },
        });
        newData = {
            first_name: 'UnitTest-firstname-modified',
            last_name: 'UnitTest-lastname-modified',
            email: 'UnitTest@email.testmodified',
            password: '123456789',
            role_id: 7,
            username: 'UnitTest-username-modified',
            phone_number: '123456789012',
        }
    });

    // After running the tests, delete the test user from the database
    afterAll(async () => {
        await prisma.user.delete({
            where: {
                email: newData.email,
            },
        });
        await prisma.user.delete({
            where: {
                email: testUserAlreadyExists.email,
            },
        });
    });

    it('should return a 400 error if the user with the provided ID does not exist', async () => {
        const req = { body: { id: '900000' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });

        await modifyUser(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "User doesn't exist" });
    });

    it('should return a 400 error if the new email belongs to an existing user', async () => {
        const testUser = JSON.parse(JSON.stringify(testUserToModify));
        testUser.email = testUserAlreadyExists.email;
        const req = { body: { ...testUser } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });

        await modifyUser(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "User with new email already exists" });
    });

    it('should return a 400 error if the new username belongs to an existing user', async () => {
        const testUser = JSON.parse(JSON.stringify(testUserToModify));
        testUser.username = testUserAlreadyExists.username;
        const req = { body: { ...testUser } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });

        await modifyUser(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "User with new username already exists" });
    });

    it('should return a 400 error if the new phone number belongs to an existing user', async () => {
        const testUser = JSON.parse(JSON.stringify(testUserToModify));
        testUser.phone_number = testUserAlreadyExists.phone_number;
        const req = { body: { ...testUser } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });

        await modifyUser(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "User with new phone number already exists" });
    });

    it('should return the user with the provided ID', async () => {
        const req = { body: { id: testUserToModify.id, ...newData } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await modifyUser(req, res);
        expect(res.status).toBeCalledWith(201);
        expect(res.body).toHaveProperty('first_name', newData.first_name)
        expect(res.body).toHaveProperty('last_name', newData.last_name)
        expect(res.body).toHaveProperty('email', newData.email)
        expect(res.body).toHaveProperty('role_id', newData.role_id)
        expect(res.body).toHaveProperty('username', newData.username)
        expect(res.body).toHaveProperty('phone_number', newData.phone_number)

    });

});