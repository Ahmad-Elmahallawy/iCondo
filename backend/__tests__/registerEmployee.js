const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {registerEmployee, getEmployeeIdByEmail} = require('../controller/userController')
describe('registerEmployee', () => {
    let testEmployee
    afterAll(async () => {
        if (testEmployee) {
            try {
                // Delete the testEmployee from the database based on their email
                await prisma.User.deleteMany({
                    where: {
                        email: 'test033122@example.com'
                    },
                });
                console.log('Test employee deleted successfully.');
            } catch (error) {
                console.error('Error deleting test employee:', error);
            }
        }
    });


    it('should register a new user', async () => {
        // Define a test user payload
        //company has to exist in order for test to pass
        testEmployee = {
            //add userid and compare after
            first_name: 'John',
            last_name: 'Doe',
            email: 'test033122@example.com',
            username:'galapagos13334',
            phone_number:'1111234563744',
            company_name:'BIG12',
            password:'abc',
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