const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {registerEmployee, registerAdminCompany,} = require('../controller/userController')
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
            email: 'testing2True7@example.com',
            username:'TestManz2',
            phone_number:'332144455551',
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
    it('shouldn\'t register due to email already taken', async () => {
        // Define missing role
        testEmployeeAlreadyExists = {
            first_name: 'bob',
            last_name: 'Keep',
            username: 'nond',
            email: 'UnitTest@email.forever',
            password: 'testpassword',
            phone_number: '5147778888',
            company_name: 'BIGG87',
        };
        const req = { body: testEmployeeAlreadyExists };

        // Simulate an HTTP response
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await registerEmployee(req, res)
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error:"Email is already taken"});
    });

    it('shouldn\'t register due to company not existing', async () => {
        // Define missing role
        testEmployeeNoCompany = {
            first_name: 'bob',
            last_name: 'Keep',
            username: 'nond',
            email: 'validTest@email.forever',
            password: 'testpassword',
            phone_number: '51477778',
            company_name: 'unknown',
        };
        const req = { body: testEmployeeNoCompany };

        // Simulate an HTTP response
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        res.json.mockImplementation((body) => {
            res.body = body;
            return res;
        });
        await registerEmployee(req, res)
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error:"Company does not exist"});
    });
});