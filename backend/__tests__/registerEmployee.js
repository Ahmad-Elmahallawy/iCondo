const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {registerEmployee} = require('../controller/userController')
describe('registerEmployee', () => {
    let testEmployee
    afterAll(async () => {
        if (testEmployee) {
            // Delete the companyEmployee from the database
            await prisma.Company_employee.delete({
                where: {
                    company_name: testEmployee.company_name
                }
            });
        }
    });

    it('should register a new user', async () => {
        // Define a test user payload
        //company has to exist in order for test to pass
        testEmployee = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test01609@example.com',
            username:'moj087906p0o',
            phone_number:'36809743555906788',
            company_name:'BIG413am911oo4',
            password:'tumer96icSauces',
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
        expect(response.body.role).toEqual('FinanceManager'); //will be changed after

    });
});