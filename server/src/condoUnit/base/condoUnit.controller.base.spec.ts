import { Test, TestingModule } from "@nestjs/testing";

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
import { CondoUnitController } from "../condoUnit.controller";
import { CondoUnitService } from "../condoUnit.service";

const nonExistingId = "nonExistingId";
const failId = 0;
const existingId = "existingId";
const CREATE_INPUT = {
  condoFee: 42.424242424,
  createdAt: new Date(),
  id: 42,
  size: "exampleSize",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  condoFee: 42.424242424,
  createdAt: new Date(),
  id: 42,
  size: "exampleSize",
  updatedAt: new Date(),
};
const NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
  error: "Not Found",
};
const FIND_MANY_RESULT = [
  {
    condoFee: 42.424242424,
    createdAt: new Date(),
    id: 42,
    size: "exampleSize",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  condoFee: 42.424242424,
  createdAt: new Date(),
  id: 42,
  size: "exampleSize",
  updatedAt: new Date(),
};

const FIND_ONE_FILE = {
    statusCode: HttpStatus.OK,
};

const FIND_PARKING = {
    createdAt:new Date(),
    id: 45,
    size: "exampleSize",
    property:"property5",
    statusCode: HttpStatus.OK,
};
const GET_USER_CONDOS={
    id: 9,
    statusCode:HttpStatus.OK,
}

const service = {
  createCondoUnit() {
    return CREATE_RESULT;
  },
  updateCondoUnit() {
    return NOT_FOUND;
  },
  deleteCondoUnit(){
    return NOT_FOUND;
  },
    findFile(){
        return NOT_FOUND;
    },
    connectParkingSpot(){
      return FIND_PARKING;
    },
    findParkingSpot(){
        return FIND_PARKING;
    },
    findUserCondos(){
        return GET_USER_CONDOS;
    },





  condoUnits: () => FIND_MANY_RESULT,
  condoUnit: ({ where }: { where: { id: string } }) => {
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

describe("CondoUnit", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CondoUnitService,
          useValue: service,
        },
      ],
      controllers: [CondoUnitController],
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


  test("POST /condoUnits", async () => {
    await request(app.getHttpServer())
      .post("/condoUnits")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /condoUnits", async () => {
    await request(app.getHttpServer())
      .get("/condoUnits")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /condoUnits/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/condoUnits"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /condoUnits/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/condoUnits"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /condoUnits existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/condoUnits")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/condoUnits")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  test("PATCH /condoUnits/:id non existing", async () => {
    const agent = request(app.getHttpServer());
    await agent
        .patch(`${"/condoUnits"}/${nonExistingId}`)
        .send(NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });

  test("DELETE /condoUnits/:id non existing", async () => {
      const agent = request(app.getHttpServer());
      await agent
        .delete(`${"/condoUnits"}/${nonExistingId}`)
          .send(NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });

  test("GET /condoUnits/:id/file non existing", async () => {
      const agent = request(app.getHttpServer());
      await agent
        .get(`${"/condoUnits"}/${nonExistingId}/file`)
          .send(NOT_FOUND)
          .expect({
            statusCode: HttpStatus.NOT_FOUND,
            message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
            error: "Not Found",
          });
  });


//tests for parking spot
  test("POST /condoUnits/:id/file existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
        .post(`${"/condoUnits"}/${existingId}/file`)
        .send(FIND_ONE_FILE)
        .expect(HttpStatus.CREATED);
  });

    test("GET /condoUnits/:id/parkingSpot", async () => {
        await request(app.getHttpServer())
            .get(`/condoUnits/${existingId}/parkingSpot`)
            .expect(HttpStatus.OK);
    });

    test("POST /condoUnits/:id/parkingSpot", async () => {
        await request(app.getHttpServer())
            .post(`/condoUnits/${existingId}/parkingSpot`)
            .send(CREATE_INPUT)
            .expect(HttpStatus.CREATED);
    });

    test("PATCH /condoUnits/:id/parkingSpot", async () => {
        await request(app.getHttpServer())
            .patch(`/condoUnits/${existingId}/parkingSpot`)
            .send(CREATE_INPUT)
            .expect(HttpStatus.OK);
    });

    test("DELETE /condoUnits/:id/parkingSpot", async () => {
        await request(app.getHttpServer())
            .delete(`/condoUnits/${existingId}/parkingSpot`)
            .send({ parkingSpotIds: [existingId] })
            .expect(HttpStatus.OK);
    });
    test("GET /condoUnits/:id/userCondos", async () => {
        await request(app.getHttpServer())
            .get(`/condoUnits/${existingId}/userCondos`)
            .expect(HttpStatus.OK);
    });

    test("POST /condoUnits/:id/userCondos", async () => {
        await request(app.getHttpServer())
            .post(`/condoUnits/${existingId}/userCondos`)
            .send(GET_USER_CONDOS)
            .expect({
            });
    });

    test("PATCH /condoUnits/:id/userCondos", async () => {
        await request(app.getHttpServer())
            .patch(`/condoUnits/${existingId}/userCondos`)
            .send(CREATE_INPUT)
            .expect(HttpStatus.OK);
    });

    test("DELETE /condoUnits/:id/userCondos", async () => {
        await request(app.getHttpServer())
            .delete(`/condoUnits/${existingId}/userCondos`)
            .send({ userCondoIds: [existingId] })
            .expect(HttpStatus.OK);
    });












  afterAll(async () => {
    await app.close();
  });
});
