import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { CompanyController } from "../company.controller";
import { CompanyService } from "../company.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  id: 42,
  name: "exampleName",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  createdAt: new Date(),
  id: 42,
  name: "exampleName",
  updatedAt: new Date(),
};
const UPDATE_RESULT = {
  id: 99,
};
const DELETE_RESULT = {
  id: 42,
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    id: 42,
    name: "exampleName",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  id: 42,
  name: "exampleName",
  updatedAt: new Date(),
  statusCode: HttpStatus.OK,
};
const NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
  error: "Not Found",
};
const CONNECTION_OK={
  statusCode: HttpStatus.OK,
}
const FILE_UPDATED={
  statusCode: HttpStatus.OK,
  message: `file updated"}`,
}
const FILE_FOUND={
  statusCode: HttpStatus.OK,
  message: `file found"}`,
}
const EMPLOYEES_DISCONNECTED={
  statusCode: HttpStatus.OK,
  message: `employees disconnected"}`,
}

const service = {
  createCompany() {
    return CREATE_RESULT;
  },
  deleteCompany({ where }: { where: { id: string } }){
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return NOT_FOUND;
    }
  },
  updateCompany({ where }: { where: { id: string } }){
    switch (where.id) {
      case existingId:
        return UPDATE_RESULT;
      case nonExistingId:
        return NOT_FOUND;
    }
  },
  companies: () => FIND_MANY_RESULT,
  company: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
  connectProperties(){
    return CONNECTION_OK;
  },
  disconnectProperties(){
    return CONNECTION_OK;
  },
  findProperties(){
    return CONNECTION_OK;
  },
  findFile(){
    return FILE_FOUND;
  },

  updateFile(){
    return FILE_UPDATED;
  },
  disconnectCompanyEmployees(){
    return EMPLOYEES_DISCONNECTED;
  },
  findCompanyEmployees(){
    return EMPLOYEES_DISCONNECTED;
  }
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Company", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CompanyService,
          useValue: service,
        },
      ],
      controllers: [CompanyController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /companies", async () => {
    await request(app.getHttpServer())
      .post("/companies")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /companies", async () => {
    await request(app.getHttpServer())
      .get("/companies")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /companies/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/companies"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /companies/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/companies"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /companies existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/companies")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/companies")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });
//update company success
  test("PATCH /companies/:id", async () => {
    await request(app.getHttpServer())
        .patch(`${"/companies"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(UPDATE_RESULT)
  });
//non existing
  test("PATCH /companies/:id non existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/companies"}/${nonExistingId}`)
        .send(NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });
//delete success
  test("DELETE /companies/:id", async () => {
    await request(app.getHttpServer())
        .delete(`${"/companies"}/${existingId}`)
        .expect(HttpStatus.OK)
  });

//delete doesn't exist
  test("DELETE /companies/:id non existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/companies"}/${nonExistingId}`)
        .send(NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });

//for connect properties
  test("POST /companies/:id/properties", async () => {
    await request(app.getHttpServer())
        .post(`${"/companies"}/${existingId}/properties`)
        .expect(HttpStatus.CREATED);
  });


//disconnect
  test("DELETE /companies/:id/properties", async () => {
    await request(app.getHttpServer())
        .delete(`${"/companies"}/${existingId}/properties`)
        .send([{ /* Property ID */ }])
        .expect(HttpStatus.OK);
  });

  // Test cases for lines 152-157
  test("GET /companies/:id/companyEmployees", async () => {
    await request(app.getHttpServer())
        .get(`${"/companies"}/${existingId}/companyEmployees`)
        .expect(HttpStatus.OK)
  });

// Test cases for lines 186-191
  test("POST /companies/:id/companyEmployees", async () => {
    await request(app.getHttpServer())
        .post(`${"/companies"}/${existingId}/companyEmployees`)
        .expect(HttpStatus.CREATED);
  });

// Test cases for lines 207-231
  test("PATCH /companies/:id/companyEmployees", async () => {
    await request(app.getHttpServer())
        .patch(`${"/companies"}/${existingId}/companyEmployees`)
        .send([{ /* CompanyEmployeeWhereUniqueInput */ }])
        .expect(HttpStatus.OK);
  });

// Test cases for lines 244-249
  test("DELETE /companies/:id/companyEmployees", async () => {
    await request(app.getHttpServer())
        .delete(`${"/companies"}/${existingId}/companyEmployees`)
        .send([{ /* CompanyEmployeeWhereUniqueInput */ }])
        .expect(HttpStatus.OK);
  });

// Test cases for lines 266-271
  test("GET /companies/:id/file", async () => {
    await request(app.getHttpServer())
        .get(`${"/companies"}/${existingId}/file`)
        .expect(HttpStatus.OK)
  });

// Test cases for lines 288-293
  test("POST /companies/:id/file", async () => {
    await request(app.getHttpServer())
        .post(`${"/companies"}/${existingId}/file`)
        .expect(HttpStatus.CREATED);
  });

// Test cases for lines 312-354
  test("PATCH /companies/:id/file", async () => {
    await request(app.getHttpServer())
        .patch(`${"/companies"}/${existingId}/file`)
        .send([{ /* FileWhereUniqueInput */ }])
        .expect(HttpStatus.OK);
  });

// Test cases for lines 367-372
  test("DELETE /companies/:id/file", async () => {
    await request(app.getHttpServer())
        .delete(`${"/companies"}/${existingId}/file`)
        .send([{ /* FileWhereUniqueInput */ }])
        .expect(HttpStatus.OK);
  });

// Test cases for lines 389-394
  test("GET /companies/:id/properties", async () => {
    await request(app.getHttpServer())
        .get(`${"/companies"}/${existingId}/properties`)
        .expect(HttpStatus.OK)
  });

// Test cases for lines 411-416
  test("POST /companies/:id/properties", async () => {
    await request(app.getHttpServer())
        .post(`${"/companies"}/${existingId}/properties`)
        .expect(HttpStatus.CREATED);
  });

// Test cases for lines 434-460
  test("PATCH /companies/:id/properties", async () => {
    await request(app.getHttpServer())
        .patch(`${"/companies"}/${existingId}/properties`)
        .send([{ /* PropertyWhereUniqueInput */ }])
        .expect(HttpStatus.OK);
  });

// Test cases for lines 487-492
  test("DELETE /companies/:id/properties", async () => {
    await request(app.getHttpServer())
        .delete(`${"/companies"}/${existingId}/properties`)
        .send([{ /* PropertyWhereUniqueInput */ }])
        .expect(HttpStatus.OK);
  });




  afterAll(async () => {
    await app.close();
  });
});
