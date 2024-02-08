const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {registerUser, registerAdminCompany} = require('../controller/userController')
describe('createCompany', () => {
    let testAdmin, testCompany, testAdminMissingInfo, testAdminAlreadyExists

    afterAll(async () => {
        try {
            if (testAdmin) {
                // Find the test admin user
                const user = await prisma.User.findUnique({
                    where: {
                        email: testAdmin.email,
                    },
                    include: {
                        company_employees: true, // Include related company_employees
                    },
                });

                if (user) {
                    // Delete related company employees
                    await prisma.Company_employee.deleteMany({
                        where: {
                            user_id: user.id,
                        },
                    });

                    // Delete the test admin user
                    await prisma.User.deleteMany({
                        where: {
                            email: testAdmin.email,
                        },
                    });
                }
            }

            if (testCompany) {
                // Delete the test company
                await prisma.Company.deleteMany({
                    where: {
                        name: testCompany.name,
                    },
                });
            }

            console.log('Test data deleted successfully.');
        } catch (error) {
            console.error('Error deleting test data:', error);
        }
    });

    it('should register a new admin, company and a relation between the 2', async () => {
        // Define a test user payload
        testAdmin = {
            first_name: 'mo',
            last_name: 'mop',
            username: 'firremmansi',
            email: 'forerm@exampl34ensi.com',
            password: 'moppo6l23s',
            phone_number: '7777755',
            company_name: 'BIGG87',
        };

        const req = { body: testAdmin };

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
        await registerAdminCompany(req, response)

        expect(response.status).toBeCalledWith(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('first_name', testAdmin.first_name);
        expect(response.body).toHaveProperty('last_name', testAdmin.last_name);
        expect(response.body).toHaveProperty('username', testAdmin.username);
        expect(response.body).toHaveProperty('email', testAdmin.email);
        expect(response.body).toHaveProperty('phone_number', testAdmin.phone_number);
        expect(response.body).toHaveProperty('token');
        expect(response.body.role).toEqual('Admin');
        expect(response.body).toHaveProperty('company_name', testAdmin.company_name);
    });

    it('shouldn\'t register due to missing fields', async () => {
        // Define a test user payload
        testAdminMissingInfo = {
            first_name: 'John',
        };
        const req = { body: testAdminMissingInfo };

        // Simulate an HTTP response
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await registerAdminCompany(req, res)
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error:"Please add all fields"});
    });

    it('shouldn\'t register due to user already existing', async () => {
        // Define missing role
        testAdminAlreadyExists = {
            first_name: 'Please',
            last_name: 'Keep',
            username: 'nondeletable',
            email: 'UnitTest@email.forever',
            password: 'testpassword',
            phone_number: '5147778888',
            company_name: 'BIGG87',
        };
        const req = { body: testAdminAlreadyExists };

        // Simulate an HTTP response
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await registerAdminCompany(req, res)
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error:"User already exists"});
    });
});