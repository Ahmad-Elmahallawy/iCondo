const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {registerEmployee} = require('../controller/userController')
describe('registerEmployee', () => {
    let testEmployee
    afterAll(async () => {
        if (testEmployee) {
            // Delete the test user from the database
            await prisma.Company_employee.delete({
                where: {
                    email: testEmployee.email
                }
            });
        }
    });

    it('should register a new user', async () => {
        // Define a test user payload
        testEmployee = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test91@example.com',
            username:'moj9o',
            phone_number:'34355596788',
            company_name:'bos9tonbeef',
            password:'tumer9icSauces',
        };
        const req = { body: testEmployee };

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
        await registerEmployee(req, response)

        expect(response.status).toBeCalledWith(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('first_name', testEmployee.first_name);
        expect(response.body).toHaveProperty('last_name', testEmployee.last_name);
        expect(response.body).toHaveProperty('username', testEmployee.username);
        expect(response.body).toHaveProperty('email', testEmployee.email);
        expect(response.body).toHaveProperty('phone_number', testEmployee.phone_number);
        expect(response.body).toHaveProperty('role', testEmployee.role);

    });
});