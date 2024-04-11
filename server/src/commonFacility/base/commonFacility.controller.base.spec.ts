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
import { CommonFacilityController } from "../commonFacility.controller";
import { CommonFacilityService } from "../commonFacility.service";
import * as errors from "../../errors";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  id: 1,
  status: "exampleStatus",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  createdAt: new Date(),
  id: 1,
  status: "exampleStatus",
  updatedAt: new Date(),
};
const UPDATE_RESULT = {
  createdAt: new Date(),
  id: 1,
  updatedAt: new Date(),
};
const DELETE_RESULT = {
  createdAt: new Date(),
  id: 1,
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    id: 1,
    status: "exampleStatus",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  id: 1,
  status: "exampleStatus",
  updatedAt: new Date(),
};
const NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
  error: "Not Found",
};


const service = {
  createCommonFacility() {
    return CREATE_RESULT;
  },
  updateCommonFacility: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return UPDATE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  deleteCommonFacility: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return DELETE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  commonFacilities: () => FIND_MANY_RESULT,
  commonFacility: ({ where }: { where: { id: string } }) => {
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

describe("CommonFacility", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CommonFacilityService,
          useValue: service,
        },
      ],
      controllers: [CommonFacilityController],
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

  test("POST /commonFacilities", async () => {
    await request(app.getHttpServer())
        .post("/commonFacilities")
        .send(CREATE_INPUT)
        .expect(HttpStatus.CREATED)
        .expect({
          ...CREATE_RESULT,
          createdAt: CREATE_RESULT.createdAt.toISOString(),
          updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        });
  });

  test("GET /commonFacilities", async () => {
    await request(app.getHttpServer())
        .get("/commonFacilities")
        .expect(HttpStatus.OK)
        .expect([
          {
            ...FIND_MANY_RESULT[0],
            createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
            updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          },
        ]);
  });

  test("GET /commonFacilities/:id non existing", async () => {
    await request(app.getHttpServer())
        .get(`${"/commonFacilities"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });

  test("GET /commonFacilities/:id existing", async () => {
    await request(app.getHttpServer())
        .get(`${"/commonFacilities"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect({
          ...FIND_ONE_RESULT,
          createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
          updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        });
  });

  test("POST /commonFacilities existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
        .post("/commonFacilities")
        .send(CREATE_INPUT)
        .expect(HttpStatus.CREATED)
        .expect({
          ...CREATE_RESULT,
          createdAt: CREATE_RESULT.createdAt.toISOString(),
          updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        })
        .then(function () {
          agent
              .post("/commonFacilities")
              .send(CREATE_INPUT)
              .expect(HttpStatus.CONFLICT)
              .expect({
                statusCode: HttpStatus.CONFLICT,
              });
        });
  });
  test("PATCH /commonFacilities/:id", async () => {
    await request(app.getHttpServer())
        .patch(`${"/commonFacilities"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(UPDATE_RESULT));
  });

  test("PATCH /commonFacilities/:id non existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/commonFacilities"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect(NOT_FOUND);
  });

  test("DELETE /commonFacilities/:id existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/commonFacilities"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(DELETE_RESULT));
  });

  test("DELETE /commonFacilities/:id non existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/commonFacilities"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect(NOT_FOUND);
  });
  test("GET /commonFacilities/:id/availabilities", async () => {
    await request(app.getHttpServer())
        .get(`/commonFacilities/${existingId}/availabilities`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
  });

  test("POST /commonFacilities/:id/availabilities", async () => {
    await request(app.getHttpServer())
        .post(`/commonFacilities/${existingId}/availabilities`)
        .expect(HttpStatus.CREATED);
  });
  test("PATCH /commonFacilities/:id/availabilities", async () => {
    await request(app.getHttpServer())
        .patch(`/commonFacilities/${existingId}/availabilities`)
        .expect(HttpStatus.OK);
  });

  test("DELETE /commonFacilities/:id/availabilities", async () => {
    await request(app.getHttpServer())
        .delete(`/commonFacilities/${existingId}/availabilities`)
        .expect(HttpStatus.OK);
  });
  afterAll(async () => {
    await app.close();
  });
  });