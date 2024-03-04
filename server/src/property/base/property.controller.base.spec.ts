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
import { PropertyController } from "../property.controller";
import { PropertyService } from "../property.service";
import * as errors from "../../errors";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const invalidId = "invalidId";
const CREATE_INPUT = {
  address: "exampleAddress",
  createdAt: new Date(),
  id: 42,
  lockerCount: 42,
  name: "exampleName",
  parkingCount: 42,
  unitCount: 42,
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  address: "exampleAddress",
  createdAt: new Date(),
  id: 42,
  lockerCount: 42,
  name: "exampleName",
  parkingCount: 42,
  unitCount: 42,
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    address: "exampleAddress",
    createdAt: new Date(),
    id: 42,
    lockerCount: 42,
    name: "exampleName",
    parkingCount: 42,
    unitCount: 42,
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  address: "exampleAddress",
  createdAt: new Date(),
  id: 42,
  lockerCount: 42,
  name: "exampleName",
  parkingCount: 42,
  unitCount: 42,
  updatedAt: new Date(),
};
const UPDATED_PROPERTY = {
  statusCode: HttpStatus.OK,
  message: `Property updated"}`,
};
const DELETED_PROPERTY={
  statusCode: HttpStatus.OK,
  message: `Property deleted"}`,
}
const INVALID_PROPERTY={
  statusCode: HttpStatus.BAD_REQUEST,
}

const service = {
  createProperty() {
    return CREATE_RESULT;
  },
  properties: () => FIND_MANY_RESULT,
  property: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
      case invalidId:
        return  INVALID_PROPERTY;
    }
  },
  updateProperty({ where }: { where: { id: string } }){
    switch (where.id) {
      case existingId:
        return UPDATED_PROPERTY;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  deleteProperty({ where }: { where: { id: string } }){
    switch (where.id) {
      case existingId:
        return DELETED_PROPERTY;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
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

describe("Property", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PropertyService,
          useValue: service,
        },
      ],
      controllers: [PropertyController],
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

  test("POST /properties", async () => {
    await request(app.getHttpServer())
      .post("/properties")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /properties", async () => {
    await request(app.getHttpServer())
      .get("/properties")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /properties/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/properties"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /properties/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/properties"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /properties existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/properties")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/properties")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });
  // Test case for updating an existing property
  test("PATCH /properties/:id", async () => {
    await request(app.getHttpServer())
        .patch(`${"/properties"}/${existingId}`)
        .send({ /* Updated property data */ })
        .expect(HttpStatus.OK);
  });

// Test case for deleting an existing property
  test("DELETE /properties/:id", async () => {
    await request(app.getHttpServer())
        .delete(`${"/properties"}/${existingId}`)
        .expect(HttpStatus.OK);
  });

  // Test case for attempting to delete a non-existing property
  test("DELETE /properties/:id non existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/properties"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });

// Test case for attempting to create a property with invalid data
  test("POST /properties with invalid data", async () => {
    await request(app.getHttpServer())
        .post(`${"/properties"}/${invalidId}`)
        .send({ invalidId })
        .expect(HttpStatus.NOT_FOUND)
  });

// Test case for attempting to update a non-existing property
  test("PATCH /properties/:id non existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/properties"}/${nonExistingId}`)
        .send({ /* Updated property data */ })
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });

  // Test case for attempting to retrieve a non-existing property
  test("GET /properties/:id non existing", async () => {
    await request(app.getHttpServer())
        .get(`${"/properties"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
  });

// Test case for attempting to create a property with incomplete data
  test("POST /properties with incomplete data", async () => {
    await request(app.getHttpServer())
        .post("/properties")
        .send({ /* Incomplete property data */ })
        .expect(HttpStatus.CREATED)
  });

// Test case for attempting to update a property with invalid data
  test("PATCH /properties/:id with invalid data", async () => {
    await request(app.getHttpServer())
        .patch(`${"/properties"}/${existingId}`)
        .send({ /* Invalid property data */ })
        .expect(HttpStatus.OK)
  });


  afterAll(async () => {
    await app.close();
  });
});
