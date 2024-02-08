const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {registerEmployee,} = require('../controller/userController')
describe('registerEmployee', () => {
     let testEmployee
    // afterAll(async () => {
    //     if (testEmployee) {
    //         try {
    //             // Delete the testEmployee from the database based on their email
    //             await prisma.User.deleteMany({
    //                 where: {
    //                     email: 'testify@example.com'
    //                 },
    //             });
    //             console.log('Test employee deleted successfully.');
    //         } catch (error) {
    //             console.error('Error deleting test employee:', error);
    //         }
    //     }
    // });
    //

    it('should register a new user', async () => {
        // Define a test user payload
        //company has to exist in order for test to pass
        testEmployee = {
            //add userid and compare after
            first_name: 'John',
            last_name: 'Doe',
            email: 'testingTrue7@example.com',
            username:'TestManz',
            phone_number:'3334445555',
            company_name:'BIGG87',
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