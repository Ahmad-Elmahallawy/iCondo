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
import { FileController } from "../file.controller";
import { FileService } from "../file.service";
import { MinioServer } from "../minioServer";
import * as errors from "../../errors";

const nonExistingId = "nonExistingId";
const existingId = "1";
const CREATE_INPUT = {
  bucket: "exampleBucket",
  createdAt: new Date(),
  id: 42,
  name: "exampleName",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  bucket: "exampleBucket",
  createdAt: new Date(),
  id: 42,
  name: "exampleName",
  updatedAt: new Date(),
};
const UPDATE_RESULT = {
  bucket: "exampleBucket",
  createdAt: new Date(),
  id: 42,
  name: "exampleName",
  updatedAt: new Date(),
};
const DELETE_RESULT = {
  bucket: "exampleBucket",
  createdAt: new Date(),
  id: 42,
  name: "exampleName",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    bucket: "exampleBucket",
    createdAt: new Date(),
    id: 42,
    name: "exampleName",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  bucket: "exampleBucket",
  createdAt: new Date(),
  id: 42,
  name: "exampleName",
  updatedAt: new Date(),
};
// @ts-ignore
const mockFile : Express.Multer.File = {
  fieldname: 'file',
  originalname: 'test.txt',
  mimetype: 'text/plain',
  destination: '/tmp',
  filename: 'test.txt',
  path: '/tmp/test.txt',
  size: 123
};

const service = {
  createFile() {
    return CREATE_RESULT;
  },
  updateFile: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return UPDATE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  deleteFile: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return DELETE_RESULT;
      case nonExistingId:
        throw new errors.NotFoundException(
            `No resource was found for {"id":"${nonExistingId}"}`
        );
    }
  },
  files: () => FIND_MANY_RESULT,
  file: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};
const minioServerMock = {
  uploadFile: jest.fn(),
  getFile: jest.fn(),
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

describe("File", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: FileService,
          useValue: service,
        },
        {
          provide: MinioServer,
          useValue: minioServerMock,
        }
      ],
      controllers: [FileController],
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

  test("POST /files", async () => {
    await request(app.getHttpServer())
      .post("/files")
      .attach("file", Buffer.from("", "utf-8"), "test.txt") // Attaching the file
      .field('data', JSON.stringify(CREATE_INPUT)) // Sending mock data as a field
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /files", async () => {
    await request(app.getHttpServer())
      .get("/files")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /files/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/files"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /files/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/files"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /files existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/files")
      .attach("file", Buffer.from("", "utf-8"), "test.txt") // Attaching the file
      .field('data', JSON.stringify(CREATE_INPUT)) // Sending mock data as a field
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/files")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  test("PATCH /files/:id existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/files"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(UPDATE_RESULT));
  });

  test("PATCH /files/:id non existing", async () => {
    await request(app.getHttpServer())
        .patch(`${"/files"}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
          error: "Not Found",
        });
  });

  test("DELETE /files/:id existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/files"}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(DELETE_RESULT));
  });

  test("DELETE /files/:id non existing", async () => {
    await request(app.getHttpServer())
        .delete(`${"/files"}/${nonExistingId}`)
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
