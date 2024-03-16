import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { NotificationService } from "./notification.service";
import { NotificationGrpcControllerBase } from "./base/notification.grpc.controller.base";

@swagger.ApiTags("notifications")
@common.Controller("notifications")
export class NotificationGrpcController extends NotificationGrpcControllerBase {
  constructor(protected readonly service: NotificationService) {
    super(service);
  }
}
