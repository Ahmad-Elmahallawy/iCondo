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
import { RequestController } from "../request.controller";
import { RequestService } from "../request.service";
import * as errors from "../../errors";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  id: "exampleId",
  elevator: "exampleElevator",
  key: "exampleKey",
  question: "exampleQuestion",
  reportMessage: "exampleReportMessage",
  response: "exampleResponse",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  createdAt: new Date(),
  id: "exampleId",
  elevator: "exampleElevator",
  key: "exampleKey",
  question: "exampleQuestion",
  reportMessage: "exampleReportMessage",
  response: "exampleResponse",
  updatedAt: new Date(),
};
const UPDATE_RESULT = {
  createdAt: new Date(),
  id: "exampleId",
  elevator: "exampleElevator",
  key: "exampleKey",
  question: "exampleQuestion",
  reportMessage: "exampleReportMessage",
  response: "exampleResponse",
  updatedAt: new Date(),
};
const DELETE_RESULT = {
  createdAt: new Date(),
  id: "exampleId",
  elevator: "exampleElevator",
  key: "exampleKey",
  question: "exampleQuestion",
  reportMessage: "exampleReportMessage",
  response: "exampleResponse",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    id: "exampleId",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
};
const NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
  error: "Not Found",
};
const service = {
  createRequest() {
    return CREATE_RESULT;
  },
  updateRequest: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return UPDATE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  deleteRequest: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return DELETE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  requests: () => FIND_MANY_RESULT,
  request: ({ where }: { where: { id: string } }) => {
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

describe("Request", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: RequestService,
          useValue: service,
        },
      ],
      controllers: [RequestController],
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

  test("POST /requests", async () => {
    await request(app.getHttpServer())
      .post("/requests")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /requests", async () => {
    await request(app.getHttpServer())
      .get("/requests")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /requests/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/requests"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /requests/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/requests"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /requests existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/requests")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/requests")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });
  test("PATCH /requests/:id", async () => {
    await request(app.getHttpServer())
        .patch(`${"/requests"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(UPDATE_RESULT));
  });

  test("PATCH /requests/:id non existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/requests"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect(NOT_FOUND);
  });

  test("DELETE /requests/:id existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/requests"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(DELETE_RESULT));
  });

  test("DELETE /requests/:id non existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/requests"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect(NOT_FOUND);
  });

  afterAll(async () => {
    await app.close();
  });
});
