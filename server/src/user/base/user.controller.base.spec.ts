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
import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import * as errors from "../../errors";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  email: "exampleEmail",
  firstName: "exampleFirstName",
  id: 42,
  lastName: "exampleLastName",
  password: "examplePassword",
  phoneNumber: "examplePhoneNumber",
  updatedAt: new Date(),
  username: "exampleUsername",
};
const CREATE_RESULT = {
  createdAt: new Date(),
  email: "exampleEmail",
  firstName: "exampleFirstName",
  id: 42,
  lastName: "exampleLastName",
  password: "examplePassword",
  phoneNumber: "examplePhoneNumber",
  updatedAt: new Date(),
  username: "exampleUsername",
};
const UPDATE_RESULT = {
  createdAt: new Date(),
  email: "exampleEmail",
  firstName: "exampleFirstName",
  id: 42,
  lastName: "exampleLastName",
  password: "examplePassword",
  phoneNumber: "examplePhoneNumber",
  updatedAt: new Date(),
  username: "exampleUsername",
};
const DELETE_RESULT = {
  createdAt: new Date(),
  email: "exampleEmail",
  firstName: "exampleFirstName",
  id: 42,
  lastName: "exampleLastName",
  password: "examplePassword",
  phoneNumber: "examplePhoneNumber",
  updatedAt: new Date(),
  username: "exampleUsername",
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    email: "exampleEmail",
    firstName: "exampleFirstName",
    id: 42,
    lastName: "exampleLastName",
    password: "examplePassword",
    phoneNumber: "examplePhoneNumber",
    updatedAt: new Date(),
    username: "exampleUsername",
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  email: "exampleEmail",
  firstName: "exampleFirstName",
  id: 42,
  lastName: "exampleLastName",
  password: "examplePassword",
  phoneNumber: "examplePhoneNumber",
  updatedAt: new Date(),
  username: "exampleUsername",
};
const NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
  error: "Not Found",
};

const service = {
  createUser() {
    return CREATE_RESULT;
  },
  updateUser: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return UPDATE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  deleteUser: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return DELETE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  users: () => FIND_MANY_RESULT,
  user: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
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

describe("User", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: service,
        },
      ],
      controllers: [UserController],
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

  test("POST /users", async () => {
    await request(app.getHttpServer())
      .post("/users")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /users", async () => {
    await request(app.getHttpServer())
      .get("/users")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /users/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/users"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect(NOT_FOUND);
  });

  test("GET /users/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/users"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /users existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/users")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/users")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  test("PATCH /users/:id existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/users"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(UPDATE_RESULT));
  });

  test("PATCH /users/:id non existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/users"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect(NOT_FOUND);
  });

  test("DELETE /users/:id existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/users"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(DELETE_RESULT));
  });

  test("DELETE /users/:id non existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/users"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect(NOT_FOUND);
  });
  test("GET /users/:id/companyEmployees", async () => {
    await request(app.getHttpServer())
        .get(`/users/${existingId}/companyEmployees`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
  });

  test("POST /users/:id/companyEmployees", async () => {
    await request(app.getHttpServer())
        .post(`/users/${existingId}/companyEmployees`)
        .expect(HttpStatus.CREATED);
  });
  test("PATCH /users/:id/companyEmployees", async () => {
    await request(app.getHttpServer())
        .patch(`/users/${existingId}/companyEmployees`)
        .expect(HttpStatus.OK);
  });

  test("DELETE /users/:id/companyEmployees", async () => {
    await request(app.getHttpServer())
        .delete(`/users/${existingId}/companyEmployees`)
        .expect(HttpStatus.OK);
  });
  test("GET /users/:id/files", async () => {
    await request(app.getHttpServer())
        .get(`/users/${existingId}/files`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
  });

  test("POST /users/:id/files", async () => {
    await request(app.getHttpServer())
        .post(`/users/${existingId}/files`)
        .expect(HttpStatus.CREATED);
  });
  test("PATCH /users/:id/files", async () => {
    await request(app.getHttpServer())
        .patch(`/users/${existingId}/files`)
        .expect(HttpStatus.OK);
  });

  test("DELETE /users/:id/files", async () => {
    await request(app.getHttpServer())
        .delete(`/users/${existingId}/files`)
        .expect(HttpStatus.OK);
  });
  test("GET /users/:id/posts", async () => {
    await request(app.getHttpServer())
        .get(`/users/${existingId}/posts`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
  });

  test("POST /users/:id/posts", async () => {
    await request(app.getHttpServer())
        .post(`/users/${existingId}/posts`)
        .expect(HttpStatus.CREATED);
  });
  test("PATCH /users/:id/posts", async () => {
    await request(app.getHttpServer())
        .patch(`/users/${existingId}/posts`)
        .expect(HttpStatus.OK);
  });

  test("DELETE /users/:id/posts", async () => {
    await request(app.getHttpServer())
        .delete(`/users/${existingId}/posts`)
        .expect(HttpStatus.OK);
  });
  test("GET /users/:id/requests", async () => {
    await request(app.getHttpServer())
        .get(`/users/${existingId}/requests`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
  });

  test("POST /users/:id/requests", async () => {
    await request(app.getHttpServer())
        .post(`/users/${existingId}/requests`)
        .expect(HttpStatus.CREATED);
  });
  test("PATCH /users/:id/requests", async () => {
    await request(app.getHttpServer())
        .patch(`/users/${existingId}/requests`)
        .expect(HttpStatus.OK);
  });

  test("DELETE /users/:id/requests", async () => {
    await request(app.getHttpServer())
        .delete(`/users/${existingId}/requests`)
        .expect(HttpStatus.OK);
  });
  test("GET /users/:id/reservations", async () => {
    await request(app.getHttpServer())
        .get(`/users/${existingId}/reservations`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
  });

  test("POST /users/:id/reservations", async () => {
    await request(app.getHttpServer())
        .post(`/users/${existingId}/reservations`)
        .expect(HttpStatus.CREATED);
  });
  test("PATCH /users/:id/reservations", async () => {
    await request(app.getHttpServer())
        .patch(`/users/${existingId}/reservations`)
        .expect(HttpStatus.OK);
  });

  test("DELETE /users/:id/reservations", async () => {
    await request(app.getHttpServer())
        .delete(`/users/${existingId}/reservations`)
        .expect(HttpStatus.OK);
  });
  test("GET /users/:id/userCondos", async () => {
    await request(app.getHttpServer())
        .get(`/users/${existingId}/userCondos`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
  });

  test("POST /users/:id/userCondos", async () => {
    await request(app.getHttpServer())
        .post(`/users/${existingId}/userCondos`)
        .expect(HttpStatus.CREATED);
  });
  test("PATCH /users/:id/userCondos", async () => {
    await request(app.getHttpServer())
        .patch(`/users/${existingId}/userCondos`)
        .expect(HttpStatus.OK);
  });

  test("DELETE /users/:id/userCondos", async () => {
    await request(app.getHttpServer())
        .delete(`/users/${existingId}/userCondos`)
        .expect(HttpStatus.OK);
  });
  afterAll(async () => {
    await app.close();
  });
});
