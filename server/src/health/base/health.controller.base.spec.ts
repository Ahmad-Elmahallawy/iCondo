import {Test} from "@nestjs/testing";
import {
    INestApplication,
    HttpStatus,
} from "@nestjs/common";
import request from "supertest";
import {ACLModule} from "../../auth/acl.module";
import {HealthController} from "../health.controller";
import {HealthService} from "../health.service";

const LIVE_RESULT = {};
const READY_RESULT = {};
let isReady = false;

const service = {
    isDbReady: () => {
        if (!isReady) {
            isReady = true;
            return false;
        } else {
            return isReady
        }
    },
};

describe("Health", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: HealthService,
                    useValue: service,
                },
            ],
            controllers: [HealthController],
            imports: [ACLModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    test("GET /_health/live", async () => {
        await request(app.getHttpServer())
            .get("/_health/live")
            .expect(HttpStatus.NO_CONTENT)
            .expect(LIVE_RESULT);
    });

    test("GET /_health/ready not ready", async () => {
        await request(app.getHttpServer())
            .get("/_health/ready")
            .expect(HttpStatus.NOT_FOUND)
            .expect(READY_RESULT);
    });

    test("GET /_health/ready is ready", async () => {
        await request(app.getHttpServer())
            .get("/_health/ready")
            .expect(HttpStatus.NO_CONTENT)
            .expect(READY_RESULT);
    });

    afterAll(async () => {
        await app.close();
    });
});
