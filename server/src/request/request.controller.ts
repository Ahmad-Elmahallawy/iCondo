import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { RequestService } from "./request.service";
import { RequestControllerBase } from "./base/request.controller.base";

@swagger.ApiTags("requests")
@common.Controller("requests")
export class RequestController extends RequestControllerBase {
  constructor(
    protected readonly service: RequestService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
