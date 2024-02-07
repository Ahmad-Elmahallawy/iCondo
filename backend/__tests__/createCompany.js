const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {registerUser, registerAdminCompany} = require('../controller/userController')
describe('createCompany', () => {
    let testAdmin
    let testCompany
    afterAll(async () => {
        if (testAdmin) {
            // Delete the test user from the database
            await prisma.Company_employee.delete({
                where: {
                    user: testAdmin.user_id,
                }
            });
            await prisma.User.delete({
                where: {
                    email: testAdmin.email
                }
            });
        }
        if (testCompany) {
            // Delete the test company from the database
            await prisma.Company.delete({
                where: {
                    name: testCompany.name
                }
            });
        }
    });

    it('should register a new admin, company and a relation between the 2', async () => {
        // Define a test user payload
        testAdmin = {
            first_name: 'mo',
            last_name: 'moop',
            username: 'mop14m36177omoo34p',
            email: 'moabo41366771o@exampl34e.com',
            password: 'mopo6l23',
            phone_number: '263413197335333',
            company_name: 'BIG413am911oo4',
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
});