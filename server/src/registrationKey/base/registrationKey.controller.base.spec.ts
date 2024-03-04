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
import { RegistrationKeyController } from "../registrationKey.controller";
import { RegistrationKeyService } from "../registrationKey.service";
import * as errors from "../../errors";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  id: 42,
  updatedAt: new Date(),
  value: "exampleValue",
};
const CREATE_RESULT = {
  createdAt: new Date(),
  id: 42,
  updatedAt: new Date(),
  value: "exampleValue",
};
const UPDATE_RESULT = {
  createdAt: new Date(),
  id: 42,
  updatedAt: new Date(),
};
const DELETE_RESULT = {
  createdAt: new Date(),
  id: 42,
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    id: 42,
    updatedAt: new Date(),
    value: "exampleValue",
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  id: 42,
  updatedAt: new Date(),
  value: "exampleValue",
};

const service = {
  createRegistrationKey() {
    return CREATE_RESULT;
  },
  updateRegistrationKey: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return UPDATE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  deleteRegistrationKey: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return DELETE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  registrationKeys: () => FIND_MANY_RESULT,
  registrationKey: ({ where }: { where: { id: string } }) => {
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

describe("RegistrationKey", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: RegistrationKeyService,
          useValue: service,
        },
      ],
      controllers: [RegistrationKeyController],
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

  test("POST /registrationKeys", async () => {
    await request(app.getHttpServer())
      .post("/registrationKeys")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /registrationKeys", async () => {
    await request(app.getHttpServer())
      .get("/registrationKeys")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /registrationKeys/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/registrationKeys"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /registrationKeys/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/registrationKeys"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /registrationKeys existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/registrationKeys")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/registrationKeys")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  test("PATCH /registrationKeys/:id existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/registrationKeys"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(UPDATE_RESULT));
  });

  test("PATCH /registrationKeys/:id non existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/registrationKeys"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });

  test("DELETE /registrationKeys/:id existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/registrationKeys"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(DELETE_RESULT));
  });

  test("DELETE /registrationKeys/:id non existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/registrationKeys"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });

  afterAll(async () => {
    await app.close();
  });
});
