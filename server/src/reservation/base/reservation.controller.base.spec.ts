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
import { ReservationController } from "../reservation.controller";
import { ReservationService } from "../reservation.service";
import * as errors from "../../errors";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  availablity: "exampleAvailablity",
  createdAt: new Date(),
  id: "exampleId",
  notes: "exampleNotes",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  availablity: "exampleAvailablity",
  createdAt: new Date(),
  id: "exampleId",
  notes: "exampleNotes",
  updatedAt: new Date(),
};
const UPDATE_RESULT = {
  availablity: "exampleAvailablity",
  createdAt: new Date(),
  id: "exampleId",
  notes: "exampleNotes",
  updatedAt: new Date(),
};
const DELETE_RESULT = {
  availablity: "exampleAvailablity",
  createdAt: new Date(),
  id: "exampleId",
  notes: "exampleNotes",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    availablity: "exampleAvailablity",
    createdAt: new Date(),
    id: "exampleId",
    notes: "exampleNotes",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  availablity: "exampleAvailablity",
  createdAt: new Date(),
  id: "exampleId",
  notes: "exampleNotes",
  updatedAt: new Date(),
};
const NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
  error: "Not Found",
};
const service = {
  createReservation() {
    return CREATE_RESULT;
  },
  updateReservation: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return UPDATE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  deleteReservation: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return DELETE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  reservations: () => FIND_MANY_RESULT,
  reservation: ({ where }: { where: { id: string } }) => {
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

describe("Reservation", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ReservationService,
          useValue: service,
        },
      ],
      controllers: [ReservationController],
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

  test("POST /reservations", async () => {
    await request(app.getHttpServer())
      .post("/reservations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /reservations", async () => {
    await request(app.getHttpServer())
      .get("/reservations")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /reservations/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/reservations"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /reservations/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/reservations"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /reservations existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/reservations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/reservations")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });
  test("PATCH /reservations/:id", async () => {
    await request(app.getHttpServer())
        .patch(`${"/reservations"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(UPDATE_RESULT));
  });

  test("PATCH /reservations/:id non existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/reservations"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect(NOT_FOUND);
  });

  test("DELETE /reservations/:id existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/reservations"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(DELETE_RESULT));
  });

  test("DELETE /reservations/:id non existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/reservations"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect(NOT_FOUND);
  });

  afterAll(async () => {
    await app.close();
  });
});
